var months = require('./months')
var paymentApi = require('./wrapper/payment-api')

module.exports = function(userId) {
  var thisMonth = months.thisMonth(),
      lastMonth = months.lastMonth()

  return {
    thisMonth: paymentApi(userId, thisMonth.year, thisMonth.month),
    lastMonth: paymentApi(userId, lastMonth.year, lastMonth.month)
  }
}
