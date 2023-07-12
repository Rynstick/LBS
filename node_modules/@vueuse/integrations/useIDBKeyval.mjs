import { toValue } from '@vueuse/shared';
import { ref, shallowRef, watch } from 'vue-demi';
import { get, set, del, update } from 'idb-keyval';

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
  const isFinished = ref(false);
  const data = (shallow ? shallowRef : ref)(initialValue);
  const rawInit = toValue(initialValue);
  async function read() {
    try {
      const rawValue = await get(key);
      if (rawValue === void 0) {
        if (rawInit !== void 0 && rawInit !== null && writeDefaults)
          await set(key, rawInit);
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
        await del(key);
      } else {
        if (Array.isArray(data.value))
          await update(key, () => JSON.parse(JSON.stringify(data.value)));
        else if (typeof data.value === "object")
          await update(key, () => __spreadValues({}, data.value));
        else
          await update(key, () => data.value);
      }
    } catch (e) {
      onError(e);
    }
  }
  watch(data, () => write(), { flush, deep });
  return { isFinished, data };
}

export { useIDBKeyval };
