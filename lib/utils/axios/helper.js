import { isObject, isString } from "../is";
export function createNow(join, restful) {
  if (restful === void 0) {
    restful = false;
  }

  if (!join) {
    return restful ? '' : {};
  }

  var now = new Date().getTime();

  if (restful) {
    return "?_t=" + now;
  }

  return {
    _t: now
  };
}
var DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
/**
 * @description: Format request parameter time
 */

export function formatRequestDate(params) {
  for (var key in params) {
    if (params[key] && params[key]._isAMomentObject) {
      params[key] = params[key].format(DATE_TIME_FORMAT);
    }

    if (isString(key)) {
      var value = params[key];

      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value;
        } catch (error) {
          throw new Error(error);
        }
      }
    }

    if (isObject(params[key])) {
      formatRequestDate(params[key]);
    }
  }
}