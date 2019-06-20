"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _getDisplayName = _interopRequireDefault(require("./utils/getDisplayName"));

var _shallowDiff = _interopRequireDefault(require("./utils/shallowDiff"));

var _getWindowSizes = _interopRequireDefault(require("./utils/getWindowSizes"));

var _SizesContext = _interopRequireDefault(require("./SizesContext"));

var presets = _interopRequireWildcard(require("./presets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getWindowSizesWithFallback = function getWindowSizesWithFallback(props) {
  var fallbackHeight = props.fallbackHeight,
      fallbackWidth = props.fallbackWidth,
      forceFallback = props.forceFallback;
  return (0, _getWindowSizes.default)({
    fallbackHeight: fallbackHeight,
    fallbackWidth: fallbackWidth,
    forceFallback: forceFallback
  });
};

var withSizes = function withSizes() {
  for (var _len = arguments.length, mappedSizesToProps = new Array(_len), _key = 0; _key < _len; _key++) {
    mappedSizesToProps[_key] = arguments[_key];
  }

  return function (WrappedComponent) {
    var parseMappedSizesToProps = function parseMappedSizesToProps(dimensions, props) {
      return mappedSizesToProps.map(function (check) {
        return check(dimensions, props);
      }).reduce(function (acc, props) {
        return _objectSpread({}, acc, props);
      }, {});
    };

    var ComponentWithSizes =
    /*#__PURE__*/
    function (_PureComponent) {
      _inherits(ComponentWithSizes, _PureComponent);

      function ComponentWithSizes(props) {
        var _this;

        _classCallCheck(this, ComponentWithSizes);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(ComponentWithSizes).call(this, props));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "dispatchSizes", function () {
          var propsToPass = _this.getPropsToPass();

          if ((0, _shallowDiff.default)(propsToPass, _this.state.propsToPass)) {
            _this.setState({
              propsToPass: propsToPass
            });
          }
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "throttledDispatchSizes", (0, _lodash.default)(_this.dispatchSizes, _this.props.throttle));

        _this.getPropsToPass = function () {
          return parseMappedSizesToProps(getWindowSizesWithFallback(_this.props), _this.props);
        };

        _this.state = {
          propsToPass: _this.getPropsToPass()
        };
        return _this;
      }
      /* Dispatching & Throttling */


      _createClass(ComponentWithSizes, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          window.addEventListener('resize', this.throttledDispatchSizes);
          this.dispatchSizes();
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.throttledDispatchSizes.cancel();
          window.removeEventListener('resize', this.throttledDispatchSizes);
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props = this.props,
              fallbackHeight = _this$props.fallbackHeight,
              fallbackWidth = _this$props.fallbackWidth,
              forceFallback = _this$props.forceFallback,
              throttle = _this$props.throttle,
              otherProps = _objectWithoutProperties(_this$props, ["fallbackHeight", "fallbackWidth", "forceFallback", "throttle"]);

          return _react.default.createElement(WrappedComponent, _extends({}, otherProps, this.state.propsToPass));
        }
      }], [{
        key: "getDerivedStateFromProps",

        /* Lifecycles */
        value: function getDerivedStateFromProps(props, state) {
          var propsToPass = parseMappedSizesToProps(getWindowSizesWithFallback(props), props);

          if ((0, _shallowDiff.default)(propsToPass, state.propsToPass)) {
            return {
              propsToPass: propsToPass
            };
          }

          return null;
        }
      }]);

      return ComponentWithSizes;
    }(_react.PureComponent);

    _defineProperty(ComponentWithSizes, "displayName", "withSizes(".concat((0, _getDisplayName.default)(WrappedComponent), ")"));

    var WithSizes = function WithSizes(props) {
      return _react.default.createElement(_SizesContext.default.Consumer, null, function (config) {
        return _react.default.createElement(ComponentWithSizes, _extends({}, config, props));
      });
    };

    return WithSizes;
  };
};

var _default = Object.assign(withSizes, _objectSpread({}, presets));

exports.default = _default;