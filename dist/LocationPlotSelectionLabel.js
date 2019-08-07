"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _memoize = require("memoize");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _plotUtils = require("plot-utils");

require("./LocationPlotSelectionLabel.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var START_KEY = "START";
var END_KEY = "END";
var NAME_KEY = "NAME";
var ID_KEY = "ID";

var LocationPlotSelectionLabel =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(LocationPlotSelectionLabel, _PureComponent);

  function LocationPlotSelectionLabel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LocationPlotSelectionLabel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LocationPlotSelectionLabel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "indexData", (0, _memoize.memoize_one)(function (data) {
      var ret = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var rec = _step.value;
          ret[rec[ID_KEY]] = rec;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return ret;
    }));

    return _this;
  }

  _createClass(LocationPlotSelectionLabel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          selection = _this$props.selection,
          minX = _this$props.minX,
          maxX = _this$props.maxX,
          width = _this$props.width,
          height = _this$props.height;

      if (!(selection in data)) {
        return null;
      }

      var indexedData = this.indexData(data);
      var domStart = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, indexedData[selection][START_KEY]);
      var domEnd = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, indexedData[selection][END_KEY]);
      var label = indexedData[selection][NAME_KEY];
      var labelDomX = (Math.max(0, domStart) + Math.min(width, domEnd)) / 2;
      return _react.default.createElement("div", {
        className: "LocationPlotSelectionLabel",
        style: {
          width: width,
          height: height
        }
      }, _react.default.createElement("div", {
        className: "LocationPlotSelectionLabel-float",
        style: {
          left: labelDomX
        }
      }, label));
    }
  }]);

  return LocationPlotSelectionLabel;
}(_react.PureComponent);

LocationPlotSelectionLabel.propTypes = {
  data: _propTypes.default.array.isRequired,
  selection: _propTypes.default.number,
  minX: _propTypes.default.number.isRequired,
  maxX: _propTypes.default.number.isRequired,
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired
};
var _default = LocationPlotSelectionLabel;
exports.default = _default;