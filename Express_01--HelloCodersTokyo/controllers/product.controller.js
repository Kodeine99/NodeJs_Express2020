//use lowdb
// var db = require('../db');

// module.exports.index = function (req, res) {
//   //paginations
//   var page = parseInt(req.query.page) || 1;
//   var perPage = 4;

//   var start = (page - 1) * perPage;
//   var end = page * perPage;

//   var nextPage = parseInt(page + 1);
//   var prevPage = parseInt(page - 1);

//   res.render('Products/index', {
//     Products: db.get('Products').value().slice(start, end),
//     prevPage: prevPage,
//     nextPage: nextPage,
//     page: page
//   })
// };

// use mongodb
var Product = require('../models/product.model');

module.exports.index = async function (req, res) {
  var Products = await Product.find();
  res.render('products/index', {
    Products: Products
  });
}
