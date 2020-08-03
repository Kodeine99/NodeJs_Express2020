var Product = require('../../models/product.model');

module.exports.index = async function (req, res) {
  var Products = await Product.find();
  res.json(Products);
};

module.exports.create = async function (req, res) {
  var Product = await Product.create(req.body);
  res.json(Product);
};
