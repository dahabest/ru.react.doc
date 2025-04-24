module.exports = function loader({src, width, quality}) {
  return `/ru.react.doc${src}?w=${width}&q=${quality || 75}`;
};
