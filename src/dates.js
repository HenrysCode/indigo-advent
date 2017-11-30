const daysInAdvent = 24
// function to return a list of dates in advent
export default () => {
  var dates = []
  var firstDay = new Date('12-1-2017')
  // loop over 24 days until Christmas
  for (let i = 0; i < daysInAdvent; i++) {
    var date = new Date('12-1-2017').setDate(i)
    dates.push(date)
  }
  return dates
}