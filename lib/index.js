'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var importFrom = _interopDefault(require('import-from'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    if (i % 2) {
      var source = arguments[i] != null ? arguments[i] : {};
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i]));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(arguments[i], key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function importPrettier() {
  var directories = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  directories = [].concat(_toConsumableArray(directories), [process.cwd()]);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = directories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var directory = _step.value;
      var prettier = importFrom.silent(directory, 'prettier');

      if (prettier) {
        return prettier;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return require('prettier');
}

var defaultOptions = {};

function formatWithOptions(source, prettier, options) {
  options = _objectSpread2({
    parser: 'babel'
  }, options);
  return prettier.format(source, options);
}

function resolveConfig(prettier, options, sync) {
  return (sync ? prettier.resolveConfig.sync : prettier.resolveConfig)(options.filePath, options);
}

function formatter(source, options, sync) {
  options = _objectSpread2({}, defaultOptions, {}, options);
  var prettier = importPrettier(options.filePath ? [path.dirname(options.filePath)] : []);
  var config = options.filePath ? resolveConfig(prettier, options, sync) : undefined;

  if (sync) {
    return formatWithOptions(source, prettier, _objectSpread2({}, config, {}, options));
  }

  return Promise.resolve(config).then(function (config) {
    return formatWithOptions(source, prettier, _objectSpread2({}, config, {}, options));
  });
}

function format(source, options) {
  return formatter(source, options, false);
}

function formatSync(source, options) {
  return formatter(source, options, true);
}

format.sync = formatSync;

module.exports = format;
