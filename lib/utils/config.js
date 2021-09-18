import _extends from "@babel/runtime/helpers/extends";
var $PERFIN = {};

var setConfig = function setConfig(option) {
  $PERFIN = _extends({}, $PERFIN, option);
};

var getConfig = function getConfig(key) {
  return $PERFIN[key];
};

export { getConfig, setConfig };