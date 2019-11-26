export default function debounce(fn, t) {
  var fnCall = null;
  return function () {
    var context = this, args = arguments;
    if (fnCall !== null) {
      window.clearTimeout(fnCall);
    }
    fnCall = window.setTimeout(function() {
      fn.apply(context, args);
      fnCall = null;
    }, t);
  };
}
