import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { saveUsers, calculateRR7days } from '../../redux/slices/usersSlice';
import { Table, Input, Button, Row, Form, notification } from 'antd';
import moment from 'moment';

const EditableContext = React.createContext(null);

export default function FunctionEditableTable () {
  const dispatch = useDispatch()

  function handleSaveUsers (array) {
    dispatch(saveUsers(array))
  }

  function handleCalculateRR7 (value) {
    dispatch(calculateRR7days(value))
  }

  return <EditableTable
    handleSaveUsers={ handleSaveUsers }
    notification={ notification }
    handleCalculateRR7={ handleCalculateRR7 }
  />
}

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={ form } component={ false }>
      <EditableContext.Provider value={ form }>
        <tr { ...props } />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={ {
          margin: 0,
        } }
        name={ dataIndex }
        rules={ [
          {
            required: true,
            message: `${title} is required.`,
          },
        ] }
      >
        <Input ref={ inputRef } onPressEnter={ save } onBlur={ save } />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={ {
          paddingRight: 24,
        } }
        onClick={ toggleEdit }
      >
        { children }
      </div>
    );
  }

  return <td { ...restProps }>{ childNode }</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'User ID',
        dataIndex: 'user_id',
        width: '20%',
        editable: false,
      },
      {
        title: 'Date registration',
        dataIndex: 'registration_date',
        width: '40%',
        editable: true,
      },
      {
        title: 'Date Last Activity',
        dataIndex: 'last_activity_date',
        width: '40%',
        editable: true,
      },
    ];
    this.state = {
      dataSource: [
        {
          key: '1',
          user_id: '1',
          registration_date: '24.12.2021',
          last_activity_date: '25.12.2021',
        },
        {
          key: '2',
          user_id: '2',
          registration_date: '05.06.2021',
          last_activity_date: '16.06.2021',
        },
        {
          key: '3',
          user_id: '3',
          registration_date: '05.06.2021',
          last_activity_date: '16.06.2021',
        },
        {
          key: '4',
          user_id: '4',
          registration_date: '05.06.2021',
          last_activity_date: '16.06.2021',
        },
        {
          key: '5',
          user_id: '5',
          registration_date: '05.06.2021',
          last_activity_date: '08.06.2021',
        },
        {
          key: '6',
          user_id: '6',
          registration_date: '05.06.2021',
          last_activity_date: '08.06.2021',
        },
        {
          key: '7',
          user_id: '7',
          registration_date: '05.06.2021',
          last_activity_date: '08.06.2021',
        },
        {
          key: '8',
          user_id: '8',
          registration_date: '05.06.2021',
          last_activity_date: '08.06.2021',
        },
      ],
      count: 3,
    };
  }

  handleSave = (row) => {
    console.log(row)
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  handleSaveOnServer = () => {
    const { handleSaveUsers, notification } = this.props;
    const { dataSource } = this.state;

    handleSaveUsers(dataSource);
    notification.success({
      message: 'Таблица сохранена (консоль)',
    })
    // Можно считать, что будет запрос на сервер
    // axios.post('api_url', {users: dataSource})
  }

  handleCalculateRR7 = () => {
    const { handleCalculateRR7, handleSaveUsers } = this.props;
    const { dataSource } = this.state;

    moment.defaultFormat = "DD.MM.YYYY";

    let rr7returnedUsersCountAfterThenX = 0;
    let rr7registeredUsersMoreThanX = 0;

    const usersWithLivePeriod = dataSource.map(user => {
      // Вынужденный фикс, так как momentjs индексирует месяцы от 0 до 11
      // а с сервера приходит обычная строка с 12 месяцем
      // естественно, для большого кол-ва юзеров такое форматирование не годится
      // в проде пришлось бы или утверждать подходящий формат (не как в ТЗ)
      // или искать другой плагин, вместо moment

      let act = user.last_activity_date
        .split('.')
        .reverse()
      act[1] = Number(act[1]) - 1
      act = moment(act);

      let reg = user.registration_date
        .split('.')
        .reverse()
      reg[1] = Number(reg[1]) - 1
      reg = moment(reg);

      let now = moment(moment().format())

      // Если зашли на 7+ день после рега
      if (act.diff(reg, 'days') >= 7) {
        rr7returnedUsersCountAfterThenX += 1
      }

      if (now.diff(reg, 'days') >= 7) {
        rr7registeredUsersMoreThanX += 1
      }

      return {
        ...user,
        livePeriodInDays: act.diff(reg, 'days')
      }
    })

    console.log(
      'rr7returnedUsersCountAfterThenX ', rr7returnedUsersCountAfterThenX
    )

    console.log(
      'rr7registeredUsersMoreThanX ', rr7registeredUsersMoreThanX
    )

    console.log(
      (rr7returnedUsersCountAfterThenX / rr7registeredUsersMoreThanX * 100).toFixed(2)
    )

    handleCalculateRR7((rr7returnedUsersCountAfterThenX / rr7registeredUsersMoreThanX * 100).toFixed(2))
    handleSaveUsers(usersWithLivePeriod);
  }

  render () {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => {
          return {
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave,
          }
        },
      };
    });
    return (
      <div>
        <Row >
          <Button
            onClick={ this.handleSaveOnServer }
            type="primary"
            style={ {
              marginBottom: 16,
              marginRight: 16
            } }
          >
            Save
          </Button>

          <Button
            onClick={ this.handleCalculateRR7 }
            type="primary"
            style={ {
              marginBottom: 16,
              marginRight: 16
            } }
          >
            Calculate
          </Button>
        </Row>

        <Table
          components={ components }
          rowClassName={ () => 'editable-row' }
          bordered
          size="small"
          dataSource={ dataSource }
          columns={ columns }
        />
      </div>
    );
  }
}
