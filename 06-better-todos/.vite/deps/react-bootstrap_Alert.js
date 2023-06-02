import {
  CloseButton_default,
  Fade_default,
  divWithClassName_default
} from "./chunk-IYHH2XXM.js";
import "./chunk-RVSLBP3T.js";
import {
  Anchor_default
} from "./chunk-BSJFX6PK.js";
import "./chunk-SHGACGMN.js";
import "./chunk-Y2GVZWZL.js";
import {
  useUncontrolled
} from "./chunk-2IARHDRE.js";
import "./chunk-INWEFJBF.js";
import {
  createWithBsPrefix
} from "./chunk-ORT6FBRB.js";
import {
  useEventCallback
} from "./chunk-7S5EFPN5.js";
import "./chunk-WS3KGL6R.js";
import {
  require_classnames,
  require_jsx_runtime,
  useBootstrapPrefix
} from "./chunk-UJLX7DUS.js";
import {
  require_react
} from "./chunk-ST3U5LCA.js";
import {
  __toESM
} from "./chunk-DFKQJ226.js";

// node_modules/react-bootstrap/esm/Alert.js
var import_classnames = __toESM(require_classnames());
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var DivStyledAsH4 = divWithClassName_default("h4");
DivStyledAsH4.displayName = "DivStyledAsH4";
var AlertHeading = createWithBsPrefix("alert-heading", {
  Component: DivStyledAsH4
});
var AlertLink = createWithBsPrefix("alert-link", {
  Component: Anchor_default
});
var Alert = React.forwardRef((uncontrolledProps, ref) => {
  const {
    bsPrefix,
    show = true,
    closeLabel = "Close alert",
    closeVariant,
    className,
    children,
    variant = "primary",
    onClose,
    dismissible,
    transition = Fade_default,
    ...props
  } = useUncontrolled(uncontrolledProps, {
    show: "onClose"
  });
  const prefix = useBootstrapPrefix(bsPrefix, "alert");
  const handleClose = useEventCallback((e) => {
    if (onClose) {
      onClose(false, e);
    }
  });
  const Transition = transition === true ? Fade_default : transition;
  const alert = (0, import_jsx_runtime2.jsxs)("div", {
    role: "alert",
    ...!Transition ? props : void 0,
    ref,
    className: (0, import_classnames.default)(className, prefix, variant && `${prefix}-${variant}`, dismissible && `${prefix}-dismissible`),
    children: [dismissible && (0, import_jsx_runtime.jsx)(CloseButton_default, {
      onClick: handleClose,
      "aria-label": closeLabel,
      variant: closeVariant
    }), children]
  });
  if (!Transition)
    return show ? alert : null;
  return (0, import_jsx_runtime.jsx)(Transition, {
    unmountOnExit: true,
    ...props,
    ref: void 0,
    in: show,
    children: alert
  });
});
Alert.displayName = "Alert";
var Alert_default = Object.assign(Alert, {
  Link: AlertLink,
  Heading: AlertHeading
});
export {
  Alert_default as default
};
//# sourceMappingURL=react-bootstrap_Alert.js.map
