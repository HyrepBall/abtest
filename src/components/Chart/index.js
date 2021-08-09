import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Chart from "react-apexcharts";

export default function MyChart () {
  const users = useSelector((state) => state.users)

  const [categories, setCategories] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    let categories = [];
    let seriesData = [];

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
  }, [users])

  return (
    <div>
      {
        !!users.calculatedRR7Value
          ?
          <>
            <h2>
              Rolling Retention 7 day: { `${users.calculatedRR7Value}%` }
            </h2>

          </>
          : null
      }
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

    if (seriesData?.length !== this.state.series[0].data.length) {
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
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}