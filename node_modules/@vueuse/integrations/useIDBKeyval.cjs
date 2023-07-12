'use strict';

var shared = require('@vueuse/shared');
var vueDemi = require('vue-demi');
var idbKeyval = require('idb-keyval');

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
function useIDBKeyval(key, initialValue, options = {}) {
  const {
    flush = "pre",
    deep = true,
    shallow = false,
    onError = (e) => {
      console.error(e);
    },
    writeDefaults = true
  } = options;
  const isFinished = vueDemi.ref(false);
  const data = (shallow ? vueDemi.shallowRef : vueDemi.ref)(initialValue);
  const rawInit = shared.toValue(initialValue);
  async function read() {
    try {
      const rawValue = await idbKeyval.get(key);
      if (rawValue === void 0) {
        if (rawInit !== void 0 && rawInit !== null && writeDefaults)
          await idbKeyval.set(key, rawInit);
      } else {
        data.value = rawValue;
      }
    } catch (e) {
      onError(e);
    }
    isFinished.value = true;
  }
  read();
  async function write() {
    try {
      if (data.value == null) {
        await idbKeyval.del(key);
      } else {
        if (Array.isArray(data.value))
          await idbKeyval.update(key, () => JSON.parse(JSON.stringify(data.value)));
        else if (typeof data.value === "object")
          await idbKeyval.update(key, () => __spreadValues({}, data.value));
        else
          await idbKeyval.update(key, () => data.value);
      }
    } catch (e) {
      onError(e);
    }
  }
  vueDemi.watch(data, () => write(), { flush, deep });
  return { isFinished, data };
}

exports.useIDBKeyval = useIDBKeyval;
