var db = require('../db');

module.exports.addToCart = function (req, res, next) {
  var productId = req.params.productId; // Lay ra productId
  var sessionId = req.signedCookies.sessionId; // Lay ra sessionId

  if (!sessionId) {
    res.redirect('/Products');
    return;
  } // Neu khong co sessionId thi tai lai trang Products

  var countProduct = db
    .get('sessions')
    .find({ id: sessionId })
    .get('cart.' + productId, 0) // truyen them tham so 0 de khong bi nhan gia tri undefined
    .value();

  db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + productId, countProduct + 1)
    .write();
  
  res.redirect('/Products');
};
