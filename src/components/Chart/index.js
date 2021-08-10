import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Chart from "react-apexcharts";
import * as isEqual from 'lodash.isequal'

export default function MyChart () {
  const users = useSelector((state) => state.users)

  const [categories, setCategories] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    let categories = [];
    let seriesData = [];
    const max = Math.max(...users.value.map(o => o.livePeriodInDays), 0);

    for (let index = 0; index < max; index++) {
      categories.push(index)
    }

    if (users.calculatedRR7Value) {
      // поиск уникальных значений
      users.value.map(user => {
        if (!categories.includes(user.livePeriodInDays)) {
          categories.push(user.livePeriodInDays)
        }
        return null
      });
      // соритровка по возрастанию
      categories.sort((a, b) => a - b);

      seriesData = categories.map(periodItem => {
        let usersWithThisPeriodsValues = 0;
        users.value.map(user => {
          if (periodItem === user.livePeriodInDays) usersWithThisPeriodsValues += 1
        })
        return usersWithThisPeriodsValues
      })

      setSeriesData(seriesData);
      setCategories(categories);
    }
  }, [users.value, users.calculatedRR7Value])

  if (!!!users?.calculatedRR7Value) {
    return null
  }

  return (
    <div>
      <h2>
        Rolling Retention 7 day: { `${users.calculatedRR7Value}%` }
      </h2>
      <AppChart seriesData={ seriesData } categories={ categories } />
    </div>
  )
}

class AppChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "Количество пользователей",
          data: []
        }
      ]
    };
  }

  componentDidUpdate (prevProps) {
    const { seriesData, categories } = this.props;
    const { series } = this.state;


    console.log(seriesData, series[0].data)

    if (!isEqual(seriesData, series[0].data)) {

      this.setState({
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: categories
          }
        },
        series: [{
          name: this.state.series.name,
          data: seriesData
        }]
      })

    }
  }

  render () {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={ this.state.options }
              series={ this.state.series }
              type="bar"
              width="1000"
            />
          </div>
        </div>
      </div>
    );
  }
}