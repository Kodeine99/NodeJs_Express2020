var mongoose = require('mongoose'); 

//khoi tao 1 Schema
var productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Product = mongoose.model('Product', productSchema, 'Products');

module.exports = Product;
