'use strict';

var vueDemi = require('vue-demi');
var core = require('@vueuse/core');
var Sortable = require('sortablejs');

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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useSortable(el, list, options = {}) {
  let sortable;
  const _a = options, { document = core.defaultDocument } = _a, resetOptions = __objRest(_a, ["document"]);
  const defaultOptions = {
    onUpdate: (e) => {
      moveArrayElement(list, e.oldIndex, e.newIndex);
    }
  };
  const start = () => {
    const target = typeof el === "string" ? document == null ? void 0 : document.querySelector(el) : core.unrefElement(el);
    if (!target)
      return;
    sortable = new Sortable(target, __spreadValues(__spreadValues({}, defaultOptions), resetOptions));
  };
  const stop = () => sortable == null ? void 0 : sortable.destroy();
  const option = (name, value) => {
    if (value !== void 0)
      sortable == null ? void 0 : sortable.option(name, value);
    else
      return sortable == null ? void 0 : sortable.option(name);
  };
  core.tryOnMounted(start);
  core.tryOnScopeDispose(stop);
  return { stop, start, option };
}
function moveArrayElement(list, from, to) {
  const array = core.toValue(list);
  if (to >= 0 && to < array.length) {
    const element = array.splice(from, 1)[0];
    vueDemi.nextTick(() => array.splice(to, 0, element));
  }
}

const UseSortable = /* @__PURE__ */ /* #__PURE__ */ vueDemi.defineComponent({
  name: "UseSortable",
  model: {
    // Compatible with vue2
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: {
    modelValue: {
      type: Array,
      required: true
    },
    tag: {
      type: String,
      default: "div"
    },
    options: {
      type: Object,
      required: true
    }
  },
  setup(props, { slots }) {
    const list = core.useVModel(props, "modelValue");
    const target = vueDemi.ref();
    const data = vueDemi.reactive(useSortable(target, list, props.options));
    return () => {
      if (slots.default)
        return vueDemi.h(props.tag, { ref: target }, slots.default(data));
    };
  }
});

exports.UseSortable = UseSortable;
