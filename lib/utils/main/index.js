export var timestamp = function timestamp() {
  return +Date.now();
};
import { unref } from 'vue';
import { isObject } from "../is";
export var clamp = function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}; // eslint-disable-next-line @typescript-eslint/no-empty-function

export var noop = function noop() {};
export var now = function now() {
  return Date.now();
};
/**
 * @description:  Set ui mount node
 */

export function getPopupContainer(node) {
  var _ref;

  return (_ref = node == null ? void 0 : node.parentNode) != null ? _ref : document.body;
}
export function generateUUID() {
  var d = new Date().getTime();

  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }

  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
}
/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */

export function setObjToUrlParams(baseUrl, obj) {
  var parameters = '';

  for (var key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }

  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}
export function deepMerge(src, target) {
  if (src === void 0) {
    src = {};
  }

  if (target === void 0) {
    target = {};
  }

  var key;

  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : src[key] = target[key];
  }

  return src;
}
export function openWindow(url, opt) {
  var _ref2 = opt || {},
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? '__blank' : _ref2$target,
      _ref2$noopener = _ref2.noopener,
      noopener = _ref2$noopener === void 0 ? true : _ref2$noopener,
      _ref2$noreferrer = _ref2.noreferrer,
      noreferrer = _ref2$noreferrer === void 0 ? true : _ref2$noreferrer;

  var feature = [];
  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');
  window.open(url, target, feature.join(','));
} // dynamic use hook props

export function getDynamicProps(props) {
  var ret = {};
  Object.keys(props).map(function (key) {
    ret[key] = unref(props[key]);
  });
  return ret;
}
/**
 * set page Title
 * @param {*} title  :page Title
 */

function setDocumentTitle(title) {
  document.title = title;
  var ua = navigator.userAgent;
  var regex = /\bMicroMessenger\/([\d.]+)/; // 兼容

  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    var i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';

    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9);
    };

    document.body.appendChild(i);
  }
}

export function setTitle(title, appTitle) {
  if (title) {
    var _title = title ? " " + title + " - " + appTitle + " " : "" + appTitle;

    setDocumentTitle(_title);
  }
}