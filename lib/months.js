module.exports = {
  thisMonth: function(){
    var now = new Date()
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1
    }
  },
  lastMonth: function(){
    var now = new Date(),
        lastMonth = new Date(now.setMonth(now.getMonth() - 1))
    return {
      year: lastMonth.getFullYear(),
      month: lastMonth.getMonth() + 1
    }
  }
}
