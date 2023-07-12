import { toRef, toValue, until, noop, tryOnScopeDispose, isClient } from '@vueuse/shared';
import Schema from 'async-validator';
import { shallowRef, ref, computed, watch, watchEffect, nextTick } from 'vue-demi';
import axios, { AxiosError } from 'axios';
import { camelCase, capitalCase, constantCase, dotCase, headerCase, noCase, paramCase, pascalCase, pathCase, sentenceCase, snakeCase } from 'change-case';
import Cookie from 'universal-cookie';
import { createDrauu } from 'drauu';
import { createEventHook, unrefElement, tryOnScopeDispose as tryOnScopeDispose$1, tryOnMounted, toValue as toValue$1, defaultDocument } from '@vueuse/core';
import { createFocusTrap } from 'focus-trap';
import Fuse from 'fuse.js';
import { get, set, del, update } from 'idb-keyval';
import jwt_decode from 'jwt-decode';
import nprogress from 'nprogress';
import QRCode from 'qrcode';
import Sortable from 'sortablejs';

var __defProp$6 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$6 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$6.call(b, prop))
      __defNormalProp$6(a, prop, b[prop]);
  if (__getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(b)) {
      if (__propIsEnum$6.call(b, prop))
        __defNormalProp$6(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
const AsyncValidatorSchema = Schema.default || Schema;
function useAsyncValidator(value, rules, options = {}) {
  const {
    validateOption = {},
    immediate = true,
    manual = false
  } = options;
  const valueRef = toRef(value);
  const errorInfo = shallowRef(null);
  const isFinished = ref(true);
  const pass = ref(!immediate || manual);
  const errors = computed(() => {
    var _a;
    return ((_a = errorInfo.value) == null ? void 0 : _a.errors) || [];
  });
  const errorFields = computed(() => {
    var _a;
    return ((_a = errorInfo.value) == null ? void 0 : _a.fields) || {};
  });
  const validator = computed(() => new AsyncValidatorSchema(toValue(rules)));
  const execute = async () => {
    isFinished.value = false;
    pass.value = false;
    try {
      await validator.value.validate(valueRef.value, validateOption);
      pass.value = true;
      errorInfo.value = null;
    } catch (err) {
      errorInfo.value = err;
    } finally {
      isFinished.value = true;
    }
    return {
      pass: pass.value,
      errorInfo: errorInfo.value,
      errors: errors.value,
      errorFields: errorFields.value
    };
  };
  if (!manual) {
    watch(
      [valueRef, validator],
      () => execute(),
      { immediate, deep: true }
    );
  }
  const shell = {
    isFinished,
    pass,
    errors,
    errorInfo,
    errorFields,
    execute
  };
  function waitUntilFinished() {
    return new Promise((resolve, reject) => {
      until(isFinished).toBe(true).then(() => resolve(shell)).catch((error) => reject(error));
    });
  }
  return __spreadProps$2(__spreadValues$6({}, shell), {
    then(onFulfilled, onRejected) {
      return waitUntilFinished().then(onFulfilled, onRejected);
    }
  });
}

var __defProp$5 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5.call(b, prop))
      __defNormalProp$5(a, prop, b[prop]);
  if (__getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(b)) {
      if (__propIsEnum$5.call(b, prop))
        __defNormalProp$5(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
function useAxios(...args) {
  const url = typeof args[0] === "string" ? args[0] : void 0;
  const argsPlaceholder = typeof url === "string" ? 1 : 0;
  let defaultConfig = {};
  let instance = axios;
  let options = {
    immediate: !!argsPlaceholder,
    shallow: true
  };
  const isAxiosInstance = (val) => !!(val == null ? void 0 : val.request);
  if (args.length > 0 + argsPlaceholder) {
    if (isAxiosInstance(args[0 + argsPlaceholder]))
      instance = args[0 + argsPlaceholder];
    else
      defaultConfig = args[0 + argsPlaceholder];
  }
  if (args.length > 1 + argsPlaceholder) {
    if (isAxiosInstance(args[1 + argsPlaceholder]))
      instance = args[1 + argsPlaceholder];
  }
  if (args.length === 2 + argsPlaceholder && !isAxiosInstance(args[1 + argsPlaceholder]) || args.length === 3 + argsPlaceholder)
    options = args[args.length - 1];
  const {
    initialData,
    shallow,
    onSuccess = noop,
    onError = noop,
    immediate,
    resetOnExecute = false
  } = options;
  const response = shallowRef();
  const data = (shallow ? shallowRef : ref)(initialData);
  const isFinished = ref(false);
  const isLoading = ref(false);
  const isAborted = ref(false);
  const error = shallowRef();
  const cancelTokenSource = axios.CancelToken.source;
  let cancelToken = cancelTokenSource();
  const abort = (message) => {
    if (isFinished.value || !isLoading.value)
      return;
    cancelToken.cancel(message);
    cancelToken = cancelTokenSource();
    isAborted.value = true;
    isLoading.value = false;
    isFinished.value = false;
  };
  const loading = (loading2) => {
    isLoading.value = loading2;
    isFinished.value = !loading2;
  };
  const resetData = () => {
    if (resetOnExecute)
      data.value = initialData;
  };
  const waitUntilFinished = () => new Promise((resolve, reject) => {
    until(isFinished).toBe(true).then(() => error.value ? reject(error.value) : resolve(result));
  });
  const promise = {
    then: (...args2) => waitUntilFinished().then(...args2),
    catch: (...args2) => waitUntilFinished().catch(...args2)
  };
  let executeCounter = 0;
  const execute = (executeUrl = url, config = {}) => {
    error.value = void 0;
    const _url = typeof executeUrl === "string" ? executeUrl : url != null ? url : config.url;
    if (_url === void 0) {
      error.value = new AxiosError(AxiosError.ERR_INVALID_URL);
      isFinished.value = true;
      return promise;
    }
    resetData();
    abort();
    loading(true);
    executeCounter += 1;
    const currentExecuteCounter = executeCounter;
    instance(_url, __spreadProps$1(__spreadValues$5(__spreadValues$5({}, defaultConfig), typeof executeUrl === "object" ? executeUrl : config), { cancelToken: cancelToken.token })).then((r) => {
      response.value = r;
      const result2 = r.data;
      data.value = result2;
      onSuccess(result2);
    }).catch((e) => {
      error.value = e;
      onError(e);
    }).finally(() => {
      var _a;
      (_a = options.onFinish) == null ? void 0 : _a.call(options);
      if (currentExecuteCounter === executeCounter)
        loading(false);
    });
    return promise;
  };
  if (immediate && url)
    execute();
  const result = {
    response,
    data,
    error,
    isFinished,
    isLoading,
    cancel: abort,
    isAborted,
    isCanceled: isAborted,
    abort,
    execute
  };
  return __spreadValues$5(__spreadValues$5({}, result), promise);
}

var changeCase = /*#__PURE__*/Object.freeze({
  __proto__: null,
  camelCase: camelCase,
  capitalCase: capitalCase,
  constantCase: constantCase,
  dotCase: dotCase,
  headerCase: headerCase,
  noCase: noCase,
  paramCase: paramCase,
  pascalCase: pascalCase,
  pathCase: pathCase,
  sentenceCase: sentenceCase,
  snakeCase: snakeCase
});

function useChangeCase(input, type, options) {
  if (typeof input === "function")
    return computed(() => changeCase[type](toValue(input), options));
  const text = ref(input);
  return computed({
    get() {
      return changeCase[type](text.value, options);
    },
    set(value) {
      text.value = value;
    }
  });
}

var __defProp$4 = Object.defineProperty;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
function createCookies(req) {
  const universalCookie = new Cookie(req ? req.headers.cookie : null);
  return (dependencies, { doNotParse = false, autoUpdateDependencies = false } = {}) => useCookies(dependencies, { doNotParse, autoUpdateDependencies }, universalCookie);
}
function useCookies(dependencies, { doNotParse = false, autoUpdateDependencies = false } = {}, cookies = new Cookie()) {
  const watchingDependencies = autoUpdateDependencies ? [...dependencies || []] : dependencies;
  let previousCookies = cookies.getAll({ doNotParse: true });
  const touches = ref(0);
  const onChange = () => {
    const newCookies = cookies.getAll({ doNotParse: true });
    if (shouldUpdate(
      watchingDependencies || null,
      newCookies,
      previousCookies
    ))
      touches.value++;
    previousCookies = newCookies;
  };
  cookies.addChangeListener(onChange);
  tryOnScopeDispose(() => {
    cookies.removeChangeListener(onChange);
  });
  return {
    /**
     * Reactive get cookie by name. If **autoUpdateDependencies = true** then it will update watching dependencies
     */
    get: (...args) => {
      if (autoUpdateDependencies && watchingDependencies && !watchingDependencies.includes(args[0]))
        watchingDependencies.push(args[0]);
      touches.value;
      return cookies.get(args[0], __spreadValues$4({ doNotParse }, args[1]));
    },
    /**
     * Reactive get all cookies
     */
    getAll: (...args) => {
      touches.value;
      return cookies.getAll(__spreadValues$4({ doNotParse }, args[0]));
    },
    set: (...args) => cookies.set(...args),
    remove: (...args) => cookies.remove(...args),
    addChangeListener: (...args) => cookies.addChangeListener(...args),
    removeChangeListener: (...args) => cookies.removeChangeListener(...args)
  };
}
function shouldUpdate(dependencies, newCookies, oldCookies) {
  if (!dependencies)
    return true;
  for (const dependency of dependencies) {
    if (newCookies[dependency] !== oldCookies[dependency])
      return true;
  }
  return false;
}

var __defProp$3 = Object.defineProperty;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
function useDrauu(target, options) {
  const drauuInstance = ref();
  let disposables = [];
  const onChangedHook = createEventHook();
  const onCanceledHook = createEventHook();
  const onCommittedHook = createEventHook();
  const onStartHook = createEventHook();
  const onEndHook = createEventHook();
  const canUndo = ref(false);
  const canRedo = ref(false);
  const altPressed = ref(false);
  const shiftPressed = ref(false);
  const brush = ref({
    color: "black",
    size: 3,
    arrowEnd: false,
    cornerRadius: 0,
    dasharray: void 0,
    fill: "transparent",
    mode: "draw"
  });
  watch(brush, () => {
    const instance = drauuInstance.value;
    if (instance) {
      instance.brush = brush.value;
      instance.mode = brush.value.mode;
    }
  }, { deep: true });
  const undo = () => {
    var _a;
    return (_a = drauuInstance.value) == null ? void 0 : _a.undo();
  };
  const redo = () => {
    var _a;
    return (_a = drauuInstance.value) == null ? void 0 : _a.redo();
  };
  const clear = () => {
    var _a;
    return (_a = drauuInstance.value) == null ? void 0 : _a.clear();
  };
  const cancel = () => {
    var _a;
    return (_a = drauuInstance.value) == null ? void 0 : _a.cancel();
  };
  const load = (svg) => {
    var _a;
    return (_a = drauuInstance.value) == null ? void 0 : _a.load(svg);
  };
  const dump = () => {
    var _a;
    return (_a = drauuInstance.value) == null ? void 0 : _a.dump();
  };
  const cleanup = () => {
    var _a;
    disposables.forEach((dispose) => dispose());
    (_a = drauuInstance.value) == null ? void 0 : _a.unmount();
  };
  const syncStatus = () => {
    if (drauuInstance.value) {
      canUndo.value = drauuInstance.value.canUndo();
      canRedo.value = drauuInstance.value.canRedo();
      altPressed.value = drauuInstance.value.altPressed;
      shiftPressed.value = drauuInstance.value.shiftPressed;
    }
  };
  watch(
    () => unrefElement(target),
    (el) => {
      if (!el || typeof SVGSVGElement === "undefined" || !(el instanceof SVGSVGElement))
        return;
      if (drauuInstance.value)
        cleanup();
      drauuInstance.value = createDrauu(__spreadValues$3({ el }, options));
      syncStatus();
      disposables = [
        drauuInstance.value.on("canceled", () => onCanceledHook.trigger()),
        drauuInstance.value.on("committed", (node) => onCommittedHook.trigger(node)),
        drauuInstance.value.on("start", () => onStartHook.trigger()),
        drauuInstance.value.on("end", () => onEndHook.trigger()),
        drauuInstance.value.on("changed", () => {
          syncStatus();
          onChangedHook.trigger();
        })
      ];
    },
    { flush: "post" }
  );
  tryOnScopeDispose(() => cleanup());
  return {
    drauuInstance,
    load,
    dump,
    clear,
    cancel,
    undo,
    redo,
    canUndo,
    canRedo,
    brush,
    onChanged: onChangedHook.on,
    onCommitted: onCommittedHook.on,
    onStart: onStartHook.on,
    onEnd: onEndHook.on,
    onCanceled: onCanceledHook.on
  };
}

var __defProp$2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useFocusTrap(target, options = {}) {
  let trap;
  const _a = options, { immediate } = _a, focusTrapOptions = __objRest$1(_a, ["immediate"]);
  const hasFocus = ref(false);
  const isPaused = ref(false);
  const activate = (opts) => trap && trap.activate(opts);
  const deactivate = (opts) => trap && trap.deactivate(opts);
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.value = true;
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.value = false;
    }
  };
  watch(
    () => unrefElement(target),
    (el) => {
      if (!el)
        return;
      trap = createFocusTrap(el, __spreadProps(__spreadValues$2({}, focusTrapOptions), {
        onActivate() {
          hasFocus.value = true;
          if (options.onActivate)
            options.onActivate();
        },
        onDeactivate() {
          hasFocus.value = false;
          if (options.onDeactivate)
            options.onDeactivate();
        }
      }));
      if (immediate)
        activate();
    },
    { flush: "post" }
  );
  tryOnScopeDispose$1(() => deactivate());
  return {
    hasFocus,
    isPaused,
    activate,
    deactivate,
    pause,
    unpause
  };
}

function useFuse(search, data, options) {
  const createFuse = () => {
    var _a, _b;
    return new Fuse(
      (_a = toValue(data)) != null ? _a : [],
      (_b = toValue(options)) == null ? void 0 : _b.fuseOptions
    );
  };
  const fuse = ref(createFuse());
  watch(
    () => {
      var _a;
      return (_a = toValue(options)) == null ? void 0 : _a.fuseOptions;
    },
    () => {
      fuse.value = createFuse();
    },
    { deep: true }
  );
  watch(
    () => toValue(data),
    (newData) => {
      fuse.value.setCollection(newData);
    },
    { deep: true }
  );
  const results = computed(() => {
    const resolved = toValue(options);
    if ((resolved == null ? void 0 : resolved.matchAllWhenSearchEmpty) && !toValue(search))
      return toValue(data).map((item, index) => ({ item, refIndex: index }));
    const limit = resolved == null ? void 0 : resolved.resultLimit;
    return fuse.value.search(toValue(search), limit ? { limit } : void 0);
  });
  return {
    fuse,
    results
  };
}

var __defProp$1 = Object.defineProperty;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
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
          await update(key, () => __spreadValues$1({}, data.value));
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

function useJwt(encodedJwt, options = {}) {
  const {
    onError,
    fallbackValue = null
  } = options;
  const decodeWithFallback = (encodedJwt2, options2) => {
    try {
      return jwt_decode(encodedJwt2, options2);
    } catch (err) {
      onError == null ? void 0 : onError(err);
      return fallbackValue;
    }
  };
  const header = computed(() => decodeWithFallback(toValue(encodedJwt), { header: true }));
  const payload = computed(() => decodeWithFallback(toValue(encodedJwt)));
  return {
    header,
    payload
  };
}

function useNProgress(currentProgress = null, options) {
  const progress = ref(currentProgress);
  const isLoading = computed({
    set: (load) => load ? nprogress.start() : nprogress.done(),
    get: () => typeof progress.value === "number" && progress.value < 1
  });
  if (options)
    nprogress.configure(options);
  const setProgress = nprogress.set;
  nprogress.set = (n) => {
    progress.value = n;
    return setProgress.call(nprogress, n);
  };
  watchEffect(() => {
    if (typeof progress.value === "number" && isClient)
      setProgress.call(nprogress, progress.value);
  });
  tryOnScopeDispose(nprogress.remove);
  return {
    isLoading,
    progress,
    start: nprogress.start,
    done: nprogress.done,
    remove: () => {
      progress.value = null;
      nprogress.remove();
    }
  };
}

function useQRCode(text, options) {
  const src = toRef(text);
  const result = ref("");
  watch(
    src,
    async (value) => {
      if (src.value && isClient)
        result.value = await QRCode.toDataURL(value, options);
    },
    { immediate: true }
  );
  return result;
}

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
  const _a = options, { document = defaultDocument } = _a, resetOptions = __objRest(_a, ["document"]);
  const defaultOptions = {
    onUpdate: (e) => {
      moveArrayElement(list, e.oldIndex, e.newIndex);
    }
  };
  const start = () => {
    const target = typeof el === "string" ? document == null ? void 0 : document.querySelector(el) : unrefElement(el);
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
  tryOnMounted(start);
  tryOnScopeDispose$1(stop);
  return { stop, start, option };
}
function moveArrayElement(list, from, to) {
  const array = toValue$1(list);
  if (to >= 0 && to < array.length) {
    const element = array.splice(from, 1)[0];
    nextTick(() => array.splice(to, 0, element));
  }
}

export { createCookies, moveArrayElement, useAsyncValidator, useAxios, useChangeCase, useCookies, useDrauu, useFocusTrap, useFuse, useIDBKeyval, useJwt, useNProgress, useQRCode, useSortable };
