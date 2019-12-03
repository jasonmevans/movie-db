export default function formatMoney(v) {
  return `$${v.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}
