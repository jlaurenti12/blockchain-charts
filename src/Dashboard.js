import React, { Component } from 'react';
import Stats from './components/Stats/Stats';
import Charts from './components/Charts/Charts';
import { dataModel } from './Model.js'
import './App.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
}

  async componentWillMount() {
    let data = await dataModel.getData();
    this.setState(data);
  }

  render() {
    const {
      marketPrice,
      avgBlockSize,
      transactionsPerDay,
      mempoolSize,
      marketPriceChart,
    } = this.state;


    return (
      <div className="App">
        <header className="App-header">
          <h1> Blockchain Dashboard </h1>
        </header>

        <section className="App-section popular">
          <h2 className="App-section-title">Popular Stats</h2>

          <div className="App-stat-row">

              <Stats
                info={marketPrice}
                title={'Current Price'}
                unit={'USD'}
                explanation={'Current price of a bitcoin in USD'}
              />

              <Stats
                info={transactionsPerDay}
                title={'Transactions per Day'}
                unit={'Transactions'}
                explanation={'The aggregate number of confirmed Bitcoin transactions in the past 24 hours.'}
              />

              <Stats
                info={avgBlockSize}
                title={'Average Block Size'}
                unit={'Megabytes'}
                explanation={'The 24 hour average block size in MB.'}
              />

              <Stats
                info={mempoolSize}
                title={'Mempool Size'}
                unit={'Bytes'}
                explanation={'The aggregate size of transactions waiting to be confirmed.'}
              />


            </div>
        </section>

        <section className="App-section currency">
          <h2 className="App-section-title">Trends</h2>

          <Charts
              data={marketPriceChart}
              title={'Market Price (USD)'}
              explanation={'Average USD market price across major bitcoin exchanges.'}
            />

        </section>
      </div>
    );
  }
}

export default Dashboard;
