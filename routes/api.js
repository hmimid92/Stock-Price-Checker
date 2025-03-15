'use strict'; 

module.exports = function (app) {

  app.route('/api/stock-prices') 
    .get(function (req, res){
      const NASDAQ_symbol = req.query.stock;
      let number_likes=0;
      if(req.query.like == 'true') {
        number_likes+=1;
      } else {
        number_likes-=1;
      }
    if(Array.isArray(NASDAQ_symbol)){
      fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${NASDAQ_symbol[0]}/quote`)
        .then(res => res.json())
        .then(data1 => {
          fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${NASDAQ_symbol[1]}/quote`)
          .then(res => res.json())
          .then(data2 => {
            let number_likes1=0;
            if(req.query.like == 'true') {
              number_likes1+=1;
            } else {
              number_likes1-=1;
            }
              res.json({
                "stockData":[{"stock":NASDAQ_symbol[0],"price":data1.latestPrice,"rel_likes":number_likes1},{"stock":NASDAQ_symbol[1],"price":data2.latestPrice,"rel_likes":number_likes1}]
               });
          })
        });
        return;
      }
      fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${NASDAQ_symbol}/quote`)
        .then(res => res.json())
        .then(data => {
       res.json({
        "stockData":{
          "stock":NASDAQ_symbol,
          "price":data.latestPrice,
          "likes":number_likes
           }
      });
    });
      
    });

};
