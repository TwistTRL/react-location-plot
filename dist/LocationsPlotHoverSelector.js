"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bisect = require("bisect");

var _plotUtils = require("plot-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LocationsPlotHoverSelector =
/*#__PURE__*/
function (_Component) {
  _inherits(LocationsPlotHoverSelector, _Component);

  function LocationsPlotHoverSelector() {
    _classCallCheck(this, LocationsPlotHoverSelector);

    return _possibleConstructorReturn(this, _getPrototypeOf(LocationsPlotHoverSelector).apply(this, arguments));
  }

  _createClass(LocationsPlotHoverSelector, [{
    key: "render",
    value: function render() {
      return null;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.hoveringPosition !== this.props.hoveringPosition) {
        return true;
      }

      return false;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.select();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.select();
    }
  }, {
    key: "select",
    value: function select() {
      var _this$props = this.props,
          data = _this$props.data,
          minX = _this$props.minX,
          maxX = _this$props.maxX,
          width = _this$props.width,
          hoveringPosition = _this$props.hoveringPosition,
          selectHandler = _this$props.selectHandler;

      if (hoveringPosition === undefined) {
        return;
      }

      if (hoveringPosition === null) {
        selectHandler(null);
        return;
      }

      this.select_memo = this.select_memo || {};
      var memo = this.select_memo;

      if (memo.data !== data) {
        memo.data = data;
        memo.starts = data.map(function (_ref) {
          var start = _ref.start;
          return start;
        });
        memo.ends = data.map(function (_ref2) {
          var end = _ref2.end;
          return end;
        });
      }

      var hoverDomX = hoveringPosition.domX;
      var hoverX = (0, _plotUtils.fromDomXCoord_Linear)(width, minX, maxX, hoverDomX);
      var startIndex = (0, _bisect.bisect_left)(memo.starts, hoverX);
      var endIndex = (0, _bisect.bisect_right)(memo.ends, hoverX);

      if (startIndex > endIndex) {
        selectHandler(null);
      } else {
        var selection = data[endIndex];
        selectHandler(selection);
      }
    }
  }]);

  return LocationsPlotHoverSelector;
}(_react.Component);

LocationsPlotHoverSelector.propTypes = {
  data: _propTypes.default.array.isRequired,
  minX: _propTypes.default.number.isRequired,
  maxX: _propTypes.default.number.isRequired,
  width: _propTypes.default.number.isRequired,
  hoveringPosition: _propTypes.default.object,
  selectHandler: _propTypes.default.func.isRequired
};
var _default = LocationsPlotHoverSelector;
exports.default = _default;