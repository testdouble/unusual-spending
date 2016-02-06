var fetchPayments = require('./fetch-payments')
var determineHighSpending = require('./determine-high-spending')
var notifyCardholder = require('./notify-cardholder')

module.exports = function(userId) {
  var payments = fetchPayments(userId),
      spending = determineHighSpending(payments)

  notifyCardholder(userId, spending)
}

