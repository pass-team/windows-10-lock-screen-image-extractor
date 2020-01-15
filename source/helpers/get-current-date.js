/**
 *  @Helper
 *  @Input: No
 *  @Output:
 *    - current date, written in format: monthName day fullYear
 */
module.exports = function () {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December',
  ];
  const date = new Date();
  return `${months[date.getMonth()]} ${date.getDay()} ${date.getFullYear()}`;
};
