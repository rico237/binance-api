var express = require('express')
var app = express()
const binance = require('node-binance-api');

var port = process.env.PORT || 8080;

binance.options({
  APIKEY: '',
  APISECRET: '',
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: true // If you want to use sandbox mode where orders are simulated
});
 
app.get('/balances', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
  	binance.balance((error, balances) => {
// 		res.send(balances);
		res.json(balances);
	});	
})

app.get('/allOrders/:symbol', function (req, res){
	var symb = req.params.symbol
	binance.allOrders(symb, (error, orders, symbol) => {
  		res.send(orders);
	});
})

app.get('/allAssets', function(req, res){
  binance.balance((error, balances) => {
    console.log("balances()", balances);
  });
})

app.get('/getSymbol/:symbol', function(req, res){
    var symb = req.params.symbol
    binance.prices(symb, (error, ticker) => {
        res.send(ticker);
    });
})

//get query&params in express

//etc. example.com/user/000000?sex=female

// app.get('/user/:id', function(req, res) {
// 
//   const query = req.query;// query = {sex:"female"}
// 
//   const params = req.params; //params = {id:"000000"}
// 
// })
 
app.listen(port)