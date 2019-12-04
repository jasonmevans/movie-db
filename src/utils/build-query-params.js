export default function buildQueryParams(params) {
  return Object.entries(params).map(([key, val]) => {
    return `${key}=${encodeURIComponent(val)}`
  }).join('&');
}
