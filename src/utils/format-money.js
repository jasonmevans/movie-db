/**
 * Adapted from https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-currency-string-in-javascript
 */
export default function formatMoney(val = 0) {
  const v = val.toFixed(2);
  return !v ? `$${v}` : `$${v.replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}
