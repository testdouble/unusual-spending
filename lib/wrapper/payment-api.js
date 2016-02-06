var paymentApi = require('payment-api')

module.exports = function(userId, year, month) {
  return paymentApi(userId, year, month)
}
