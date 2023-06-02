import {
  require_react
} from "./chunk-ST3U5LCA.js";
import {
  __toESM
} from "./chunk-DFKQJ226.js";

// node_modules/@restart/hooks/esm/useMounted.js
var import_react = __toESM(require_react());
function useMounted() {
  var mounted = (0, import_react.useRef)(true);
  var isMounted = (0, import_react.useRef)(function() {
    return mounted.current;
  });
  (0, import_react.useEffect)(function() {
    mounted.current = true;
    return function() {
      mounted.current = false;
    };
  }, []);
  return isMounted.current;
}

// node_modules/@restart/hooks/esm/usePrevious.js
var import_react2 = __toESM(require_react());
function usePrevious(value) {
  var ref = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(function() {
    ref.current = value;
  });
  return ref.current;
}

// node_modules/@restart/hooks/esm/useIsomorphicEffect.js
var import_react3 = __toESM(require_react());
var isReactNative = typeof global !== "undefined" && // @ts-ignore
global.navigator && // @ts-ignore
global.navigator.product === "ReactNative";
var isDOM = typeof document !== "undefined";
var useIsomorphicEffect_default = isDOM || isReactNative ? import_react3.useLayoutEffect : import_react3.useEffect;

export {
  useIsomorphicEffect_default,
  useMounted,
  usePrevious
};
//# sourceMappingURL=chunk-INWEFJBF.js.map
