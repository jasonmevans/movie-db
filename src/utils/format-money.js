export default function formatMoney(val = 0) {
  const v = val.toFixed(2);
  return !v ? `$${v}` : `$${v.replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}
