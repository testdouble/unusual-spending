module.exports = function() {
  var fetchPayments = td.replace('../../lib/fetch-payments'),
      determineHighSpending = td.replace('../../lib/determine-high-spending'),
      notifyCardholder = td.replace('../../lib/notify-cardholder'),
      subject = require('../../lib/unusual-spending'),
      userId = 42

  td.when(fetchPayments(userId)).thenReturn('some payments')
  td.when(determineHighSpending('some payments')).thenReturn('high spending')

  subject(userId)

  td.verify(notifyCardholder(userId, 'high spending'))
}
