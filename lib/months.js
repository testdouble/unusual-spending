module.exports = {
  thisMonth: function(){
    var now = new Date()
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1
    }
  },
  lastMonth: function(){}
}
