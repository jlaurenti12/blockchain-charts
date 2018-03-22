import React, { Component } from 'react';
import Odometer from 'react-odometerjs';

import './Stats.css';

class Stats extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {info, title, unit, explanation} = this.props;
    return (
      <div className="Stats-column">
        <div className="Stats-title">{title}</div>
        <div className="Stats-numbers">
          <Odometer value={info} />
          <div>{unit}</div>
        </div>
        <div className="Stats-explanation">{explanation}</div>
      </div>
    )
  }
}

export default Stats;
