import React, { Component } from 'react';
import {
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
  Area,
  AreaChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import moment from 'moment';
import './Charts.css';


class Charts extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    let lineChartData = [];

      if (this.props.data) {
        this.props.data.map(({ x, y }) => {
          lineChartData.push({
            ts: moment((x)*1000).format('MMM DD YYYY'),
            Price: Math.round(y)
           })
        })
        console.log(lineChartData)
      }

    return (
      <div id="container" className="Charts-column">
      <div className="Charts-title">{ this.props.title }</div>
      <ResponsiveContainer>
        <AreaChart data={lineChartData}
          margin={{top: 0, right: 30, left: 20, bottom: 5}}>
           <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1E87F0" stopOpacity={1.0}/>
              <stop offset="95%" stopColor="#1E87F0" stopOpacity={0.4}/>
            </linearGradient>
           </defs>
           <XAxis dataKey="ts" tick={{fontSize: 12}}/>
           <Tooltip content={"$"} />
           <ReferenceLine x="Dec 15 2017" stroke="green" label={{fontSize: 13, value:"Peak: $19,499"}}/>
           <Area type='monotone' dataKey='Price' stroke='#1E87F0' fill="url(#colorUv)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
      <div>{ this.props.explanation }</div>
      </div>
    )
  }
}

export default Charts;
