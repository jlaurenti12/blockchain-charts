import React from 'react';

class DataModel {
  getData() {
    return new Promise((resolve, reject) => {
      const statsReq = fetch('https://api.blockchain.info/stats?format=json&cors=true');
      const mkpReq = fetch('https://api.blockchain.info/charts/market-price?timespan=1years&format=json&cors=true');
      const chartsReq = fetch('https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&rollingAverage=8hours&format=json&cors=true');
      const blockSizeReq = fetch('https://api.blockchain.info/q/24hravgblocksize?cors=true');
      const mempoolSizeReq = fetch('https://api.blockchain.info/charts/mempool-size?timespan=1days&format=json&cors=true');

      Promise.all([statsReq, chartsReq, blockSizeReq, mempoolSizeReq, mkpReq]).then(responses => responses.map(res => {
        if (res.ok === false) {
          console.error(`Network response was not ok: ${res}`)
          reject()
        }
        return res.json();
      }))

      .then(jsonPromises => Promise.all(jsonPromises))
      .then(jsonResponses => {
        console.log(jsonResponses[3]);
        resolve({
          marketPrice: Math.round((Math.ceil(jsonResponses[0].market_price_usd * 1000) / 1000).toFixed(2)),
          avgBlockSize: Number(Math.max( Math.round(jsonResponses[2] * 100) / 100).toFixed(2)),
          transactionsPerDay: jsonResponses[0]['n_tx'],
          mempoolSize: Math.ceil(jsonResponses[3].values[jsonResponses[3].values.length - 1].y),
          marketPriceChart: jsonResponses[4].values,
        })
      })

    })

  }

}

export let dataModel = new DataModel();
