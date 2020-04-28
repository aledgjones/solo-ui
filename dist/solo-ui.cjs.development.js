'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('app-reset/app-reset.css');
var React = require('react');
var React__default = _interopDefault(React);
var isString = _interopDefault(require('lodash.isstring'));
var isObject = _interopDefault(require('lodash.isobject'));
var Color = _interopDefault(require('color'));
var ReactDOM = _interopDefault(require('react-dom'));
var Big = _interopDefault(require('big.js'));
var js = require('@mdi/js');
require('shortid');
var showdown = require('showdown');
var showdownHighlight = _interopDefault(require('showdown-highlight'));
require('highlight.js/styles/vs2015.css');
var isNumber = _interopDefault(require('lodash.isnumber'));
var isBoolean = _interopDefault(require('lodash.isboolean'));

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "body{font-family:Roboto,sans-serif}*{box-sizing:border-box;-ms-scroll-chaining:none;overscroll-behavior:contain}";
styleInject(css_248z);

/**
 * Merge strings into single string with conditional inclusion. Useful for className strings
 *
 * merge('foo', 'bar') => 'foo bar';
 * merge('foo', {'bar': false}) => 'foo';
 */

function merge() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var out = args.reduce(function (arr, arg) {
    if (arg === void 0) {
      arg = '';
    }

    // multiple classes
    if (isString(arg)) {
      var clean = arg.split(' ').filter(function (val) {
        return val !== '';
      });
      return [].concat(arr, clean);
    } // toggle classes => only append if evaluates to true


    if (isObject(arg)) {
      var keys = Object.keys(arg);

      var _clean = keys.filter(function (key) {
        return arg[key];
      });

      return [].concat(arr, _clean);
    }

    return arr;
  }, []);
  return out.join(' ');
}

var css_248z$1 = ".ui-appbar{position:fixed;top:0;left:0;width:100%;z-index:999997}.ui-appbar--shadow{box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)}.ui-appbar__content{width:100%;min-height:56px;display:flex;align-items:center;padding:0 20px}";
styleInject(css_248z$1);

/**
 * A basic top of screen app bar with dynamic shadow.
 */

var Appbar = function Appbar(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      shadow = _ref.shadow,
      children = _ref.children;
  return React__default.createElement("header", {
    id: id,
    className: merge('ui-appbar', {
      'ui-appbar--shadow': shadow
    }, className),
    style: style
  }, React__default.createElement("div", {
    className: "ui-appbar__content"
  }, children));
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var colors = {
  'A': '#1abc9c',
  'B': '#2ecc71',
  'C': '#3498db',
  'D': '#9b59b6',
  'E': '#34495e',
  'F': '#16a085',
  'G': '#27ae60',
  'H': '#2980b9',
  'I': '#8e44ad',
  'J': '#2c3e50',
  'K': '#f1c40f',
  'L': '#e67e22',
  'M': '#e74c3c',
  'N': '#ecf0f1',
  'O': '#95a5a6',
  'P': '#2ecc71',
  'Q': '#d35400',
  'R': '#c0392b',
  'S': '#bdc3c7',
  'T': '#7f8c8d',
  'U': '#f39c12',
  'V': '#f1c40f',
  'W': '#16a085',
  'X': '#2c3e50',
  'Y': '#27ae60',
  'Z': '#d35400'
};

/**
 * Hook: returns white on dark colors, black on light;
 */

function useForeground(color) {
  return React.useMemo(function () {
    return Color(color).isDark() ? '#ffffff' : '#000000';
  }, [color]);
}

var css_248z$2 = ".ui-avatar{display:block;border-radius:50%;background-color:hsla(0,0%,100%,.2);background-size:cover;background-position:50% 50%;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0}.ui-avatar__letter{font-size:inherit;color:inherit;font-weight:300;text-transform:uppercase;position:relative}";
styleInject(css_248z$2);

/**
 * Avatar component. Displays image else falls back to GMail style colored circle and letter.
 */

var Avatar = function Avatar(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      src = _ref.src,
      name = _ref.name,
      size = _ref.size;
  var letter = name.slice(0, 1).toUpperCase();
  var background = colors[letter] || 'rgb(200,200,200)';
  var foreground = useForeground(background);

  var _useState = React.useState(false),
      isImageValid = _useState[0],
      setIsImageValid = _useState[1];

  React.useEffect(function () {
    var checkImageExists = function checkImageExists(src) {
      try {
        setIsImageValid(false);

        var _temp2 = _catch(function () {
          return Promise.resolve(fetch(src, {
            mode: 'no-cors'
          })).then(function () {
            if (!didCancel) {
              setIsImageValid(true);
            }
          });
        }, function () {});

        return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };

    var didCancel = false;

    if (src) {
      checkImageExists(src);
    }

    return function () {
      didCancel = true;
    };
  }, [src]);
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-avatar', className),
    style: _extends({
      height: size,
      width: size,
      fontSize: size * .6,
      color: foreground,
      backgroundColor: background,
      backgroundImage: isImageValid ? "url(" + src + ")" : undefined
    }, style)
  }, !isImageValid && React__default.createElement("span", {
    className: "ui-avatar__letter"
  }, letter));
};

var css_248z$3 = ".ui-backdrop{position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;background-color:rgba(35,30,45,0);transition:background-color .4s}.ui-backdrop--visible{pointer-events:all;background-color:rgba(35,30,45,.6)}.ui-backdrop--transparent{background-color:rgba(35,30,45,0)!important}";
styleInject(css_248z$3);

/**
 * Backdrop component used for overlays (dialogs, sheets etc.)
 */

var Backdrop = function Backdrop(_ref) {
  var id = _ref.id,
      className = _ref.className,
      open = _ref.open,
      transparent = _ref.transparent,
      onClick = _ref.onClick;
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-backdrop', className, {
      'ui-backdrop--visible': open,
      'ui-backdrop--transparent': transparent
    }),
    onClick: onClick
  });
};

/**
 * Hook: Delay a boolean change by a fixed time (used to delay an overlay destruction after hidden)
 */

function useDelayBoolean(master, delay) {
  var _useState = React.useState(false),
      slave = _useState[0],
      setSlave = _useState[1];

  React.useEffect(function () {
    var timeout;

    if (master) {
      setSlave(true);
    } else {
      timeout = setTimeout(function () {
        return setSlave(false);
      }, delay);
    }

    return function () {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [master, delay]);
  return slave;
}

var css_248z$4 = ".ui-portal{position:fixed;pointer-events:none;z-index:1000000}";
styleInject(css_248z$4);

/**
 * Create a portal. Useful to contain dialogs, overlays etc.
 */

var Portal = function Portal(_ref) {
  var children = _ref.children;

  var _useState = React.useState(),
      container = _useState[0],
      setContainer = _useState[1];

  React.useEffect(function () {
    var $container = document.createElement('div');
    $container.className = 'ui-portal';
    document.body.appendChild($container);
    setContainer($container);
    return function () {
      $container.remove();
    };
  }, []);

  if (container) {
    return ReactDOM.createPortal(children, container);
  } else {
    return null;
  }
};

var css_248z$5 = ".ui-bottom-sheet{position:fixed;top:100%;left:50%;width:100vw;background-color:#fff;transform:translate(-50%);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:transform .4s;border-radius:12px 12px 0 0;pointer-events:all}";
styleInject(css_248z$5);

/**
 * Bottom Sheet component for displaying contexual actions.
 */

var BottomSheet = function BottomSheet(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      width = _ref.width,
      open = _ref.open,
      onClose = _ref.onClose,
      children = _ref.children;
  var render = useDelayBoolean(open, 500);
  return React__default.createElement(Portal, null, React__default.createElement(Backdrop, {
    open: open,
    onClick: onClose
  }), React__default.createElement("div", {
    id: id,
    className: merge("ui-bottom-sheet", className),
    style: _extends({
      maxWidth: width,
      maxHeight: '100vh',
      overflow: 'auto',
      transform: open ? 'translate(-50%, -100%)' : 'translate(-50%, 0)'
    }, style)
  }, render && children()));
};

var css_248z$6 = "@-webkit-keyframes rotate{0%{transform:rotate(-90deg)}to{transform:rotate(270deg)}}@keyframes rotate{0%{transform:rotate(-90deg)}to{transform:rotate(270deg)}}@-webkit-keyframes dash{0%{stroke-dasharray:5,120.66;stroke-dashoffset:0}50%{stroke-dasharray:100,25.66;stroke-dashoffset:0}to{stroke-dasharray:5,120.66;stroke-dashoffset:-125.66}}@keyframes dash{0%{stroke-dasharray:5,120.66;stroke-dashoffset:0}50%{stroke-dasharray:100,25.66;stroke-dashoffset:0}to{stroke-dasharray:5,120.66;stroke-dashoffset:-125.66}}.ui-spinner{position:relative;transform:rotate(-90deg)}.ui-spinner__circle{transform-origin:50% 50%;stroke-linecap:round;stroke-width:4px;fill:none;transition:stroke-dasharray .2s,stroke-dashoffset .2s,transform .2s}.ui-spinner--animate{-webkit-animation:rotate 1.5s linear infinite;animation:rotate 1.5s linear infinite}.ui-spinner--animate .ui-spinner__circle{-webkit-animation:dash 1.5s infinite;animation:dash 1.5s infinite;transition:none}";
styleInject(css_248z$6);

/**
 * A spinner which can be indeterminate or determinate to denote working states or progress.
 */

var Spinner = function Spinner(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      size = _ref.size,
      color = _ref.color,
      percent = _ref.percent;

  var _useMemo = React.useMemo(function () {
    if (percent !== undefined) {
      var r = 20;
      var c = new Big(2 * Math.PI * r); // circumference @ r=20;

      var _value = new Big(percent).div(100).times(c);

      return [c.minus(_value).toFixed(2), c.toFixed(2)];
    } else {
      return [undefined, undefined];
    }
  }, [percent]),
      dashoffset = _useMemo[0],
      dasharray = _useMemo[1];

  var animate = percent === undefined;
  return React__default.createElement("svg", {
    id: id,
    className: merge('ui-spinner', {
      'ui-spinner--animate': animate
    }, className),
    style: _extends({
      height: size,
      width: size
    }, style),
    viewBox: "25 25 50 50"
  }, !animate && React__default.createElement("circle", {
    className: "ui-spinner__circle",
    cx: "50",
    cy: "50",
    r: "20",
    stroke: "rgb(175, 175, 175)"
  }), React__default.createElement("circle", {
    className: "ui-spinner__circle",
    cx: "50",
    cy: "50",
    r: "20",
    stroke: color,
    strokeDasharray: dasharray,
    strokeDashoffset: dashoffset
  }));
};

var css_248z$7 = ".ui-button{display:inline-block;transition:box-shadow .1s;border-radius:3px;cursor:pointer;min-width:72px;min-height:36px;padding:7px 20px 8px;display:flex;align-items:center;justify-content:center;font-size:16px;outline:none;font-family:Roboto,sans-serif}.ui-button:focus,.ui-button:hover{box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}.ui-button:active{box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)}.ui-button--disabled{border:1px solid #c8c8c8!important;background-color:#ebebeb!important;color:#c8c8c8!important;pointer-events:none}.ui-spinner--button{margin-right:12px}";
styleInject(css_248z$7);

/**
 * Button component with optional outline-only styling.
 */

var Button = function Button(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      compact = _ref.compact,
      outline = _ref.outline,
      color = _ref.color,
      disabled = _ref.disabled,
      working = _ref.working,
      onClick = _ref.onClick;
  var bg = React.useMemo(function () {
    if (outline) {
      return 'transparent';
    } else {
      return color;
    }
  }, [color, outline]);
  var fg = useForeground(bg);
  return React__default.createElement("button", {
    id: id,
    className: merge('ui-button', {
      'ui-button--compact': compact,
      'ui-button--disabled': disabled || working
    }, className),
    style: _extends({
      color: outline ? color : fg,
      backgroundColor: bg,
      border: "1px solid " + (outline ? color : bg)
    }, style),
    onClick: onClick
  }, working && React__default.createElement(Spinner, {
    className: "ui-spinner--button",
    size: 16,
    color: "rgb(84,84,84)"
  }), children);
};

var css_248z$8 = "@-webkit-keyframes ui-card__in{0%{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes ui-card__in{0%{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}.ui-card{display:block;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);border-radius:3px}.ui-card--margin{margin-bottom:20px}.ui-card--animate{-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation:ui-card__in .4s;animation:ui-card__in .4s}";
styleInject(css_248z$8);

/**
 * Generic card component.
 */

var Card = function Card(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      margin = _ref.margin,
      animate = _ref.animate;
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-card', {
      'ui-card--margin': margin,
      'ui-card--animate': animate
    }, className),
    style: style
  }, children);
};

/**
 * Hook: sets the alpha value of a color.
 */

function useAlpha(color, alpha) {
  return React.useMemo(function () {
    return Color(color).alpha(alpha).string();
  }, [color, alpha]);
}

var css_248z$9 = ".ui-icon,.ui-icon__svg{position:relative}.ui-icon__svg{z-index:2}.ui-icon__blob{position:absolute;border-radius:50%;visibility:hidden;z-index:1;width:calc(100% + 12px);height:calc(100% + 12px);top:-6px;left:-6px;transition:border-radius .1s,background-color .1s}.ui-icon path{transition:color .1s}.ui-icon__blob--toggle{border-radius:3px;visibility:visible}.ui-icon--hover{cursor:pointer}.ui-icon--hover:hover>.ui-icon__blob{visibility:visible}.ui-icon__touch-target{position:absolute;height:48px;width:48px;top:calc(50% - 24px);left:calc(50% - 24px)}.ui-icon--disabled{opacity:.4;pointer-events:none}";
styleInject(css_248z$9);

/**
 * Icon which takes an svg path and renders.
 */

var Icon = function Icon(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      path = _ref.path,
      size = _ref.size,
      color = _ref.color,
      highlight = _ref.highlight,
      disabled = _ref.disabled,
      toggle = _ref.toggle,
      onClick = _ref.onClick;
  var bg = useAlpha(color, .1);
  var toggledFG = useForeground(highlight || color);
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-icon', {
      'ui-icon--disabled': disabled,
      'ui-icon--hover': !!onClick
    }, className),
    style: _extends({
      width: size,
      height: size
    }, style),
    onClick: onClick
  }, React__default.createElement("div", {
    className: "ui-icon__touch-target"
  }), React__default.createElement("svg", {
    className: "ui-icon__svg",
    viewBox: "0 0 24 24",
    style: {
      width: size,
      height: size
    }
  }, React__default.createElement("path", {
    d: path,
    style: {
      fill: toggle ? toggledFG : color
    }
  })), React__default.createElement("div", {
    className: merge("ui-icon__blob", {
      'ui-icon__blob--toggle': toggle
    }),
    style: {
      backgroundColor: toggle ? highlight || color : bg
    }
  }));
};

var css_248z$a = ".ui-checkbox{display:flex;align-items:center}.ui-checkbox__inner{position:relative;width:20px;height:20px;min-width:20px;border-radius:3px;border:2px solid #646464;cursor:pointer}.ui-checkbox__icon{position:absolute;top:0;left:0}.ui-checkbox__label{flex-grow:1}.ui-checkbox--margin{margin-bottom:20px}";
styleInject(css_248z$a);

/**
 * Chackbox component for boolean values.
 */

var Checkbox = function Checkbox(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      value = _ref.value,
      color = _ref.color,
      onChange = _ref.onChange,
      disabled = _ref.disabled,
      margin = _ref.margin;
  var onCheckboxChange = React.useCallback(function () {
    return onChange(!value);
  }, [value, onChange]);
  var fg = useForeground(color);
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-checkbox', {
      'ui-checkbox--active': value,
      'ui-checkbox--margin': margin,
      'ui-checkbox--disabled': disabled
    }, className),
    style: style,
    onClick: onCheckboxChange
  }, React__default.createElement("div", {
    className: "ui-checkbox__inner",
    style: {
      marginRight: children ? 20 : 0,
      borderColor: value ? color : undefined,
      backgroundColor: value ? color : undefined
    }
  }, value && React__default.createElement(Icon, {
    size: 16,
    color: fg,
    className: "ui-checkbox__icon",
    path: js.mdiCheck
  })), children && React__default.createElement("div", {
    className: "ui-checkbox__label"
  }, children));
};

var css_248z$b = ".ui-content{display:block;padding:20px}";
styleInject(css_248z$b);

/**
 * Content component with default padding.
 */

var Content = function Content(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children;
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-content', className),
    style: style
  }, children);
};

var css_248z$c = ".ui-dialog{position:fixed;display:flex;align-items:center;justify-content:center;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2;padding:40px}.ui-dialog__backdrop{z-index:1}.ui-dialog__card{margin:0 auto;border-radius:8px;width:100%;opacity:0;transform:translateY(16px);transition:opacity .4s,transform .4s;overflow:auto}.ui-dialog--show{pointer-events:all}.ui-dialog--show .ui-dialog__card{opacity:1;transform:translateY(0)}";
styleInject(css_248z$c);

/**
 * Dialog component for displaying related but long form actions.
 */

var Dialog = function Dialog(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      width = _ref.width,
      open = _ref.open,
      children = _ref.children;
  var render = useDelayBoolean(open, 500);
  return React__default.createElement(Portal, null, React__default.createElement(Backdrop, {
    className: "ui-dialog__backdrop",
    open: open
  }), React__default.createElement("div", {
    id: id,
    className: merge("ui-dialog", className, {
      'ui-dialog--show': open
    })
  }, React__default.createElement(Card, {
    className: "ui-dialog__card",
    style: _extends({
      maxWidth: width
    }, style)
  }, render && children())));
};

var css_248z$d = ".ui-divider{display:block;height:1px;width:100%;margin:8px 0;background-color:rgba(0,0,0,.1)}.ui-divider--compact{margin:0}";
styleInject(css_248z$d);

/**
 * Simple devider component.
 */

var Divider = function Divider(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      compact = _ref.compact;
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-divider', {
      'ui-divider--compact': compact
    }, className),
    style: style
  }, children);
};

var css_248z$e = ".ui-drawer{height:100vh;background-color:#fff;position:fixed;top:0;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);z-index:1;overflow:auto;transition:transform .4s;pointer-events:all;width:calc(100vw - 40px)}";
styleInject(css_248z$e);

/**
 * App drawer component.
 */

var Drawer = function Drawer(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      open = _ref.open,
      width = _ref.width,
      onClose = _ref.onClose;
  var render = useDelayBoolean(open, 500);
  return React__default.createElement(Portal, null, React__default.createElement(Backdrop, {
    open: open,
    onClick: onClose
  }), React__default.createElement("div", {
    id: id,
    className: merge('ui-drawer', className),
    style: _extends({
      maxWidth: width,
      transform: "translate3d(" + (open ? 0 : '-100%') + ", 0, 0)"
    }, style)
  }, render && children()));
};

function stepsMatch(acceptStep, typeStep) {
  return acceptStep === '*' || acceptStep === typeStep;
}

function pathsMatch(acceptPath, typePath) {
  for (var i = 0; i < acceptPath.length; i++) {
    var match = stepsMatch(acceptPath[i], typePath[i]);

    if (!match) {
      return false;
    }
  }

  return true;
}
/**
 *  Checks if a file type is accepted. Always return true if no accept param.
 */


function fileAccepted(file, accept) {
  if (accept === void 0) {
    accept = [];
  }

  // no accept length implies all accepted
  if (accept.length === 0) {
    return true;
  }

  var typePath = file.type.split('/');

  for (var i = 0; i < accept.length; i++) {
    var acceptPath = accept[i].split('/');
    var match = pathsMatch(acceptPath, typePath);

    if (match) {
      // return true if any match 
      return true;
    }
  }

  return false;
}

var css_248z$f = ".ui-dropzone{position:relative}.ui-dropzone__hover-container{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#fff;padding:40px;z-index:100;border-radius:8px}.ui-dropzone__hover-content{display:flex;align-items:center;justify-content:center;flex-direction:column;width:100%;height:100%;border:4px dashed #afafaf;pointer-events:none}.ui-dropzone__hover-text{color:#969696;margin-top:4px}";
styleInject(css_248z$f);

/**
 * A dropzone component for dropping files into the UI
 */

var DropFiles = function DropFiles(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      accept = _ref.accept,
      onDrop = _ref.onDrop;

  var _useState = React.useState(false),
      over = _useState[0],
      setOver = _useState[1];

  var handleDrop = React.useCallback(function (e) {
    if (e.dataTransfer.files.length > 0) {
      var files = Array.from(e.dataTransfer.files);
      var filtered = files.filter(function (file) {
        return fileAccepted(file, accept);
      });
      onDrop(filtered, files.length - filtered.length);
    }
  }, [accept, onDrop]);
  React.useEffect(function () {
    // prevent defaults makes drag and drop work
    var dragover = function dragover(e) {
      e.preventDefault();
    };

    var drop = function drop(e) {
      e.preventDefault();
      setOver(false);
    };

    var dragenter = function dragenter(e) {
      // if we don't have an element we have come from, we are coming from outside the window
      if (e.relatedTarget == null) {
        setOver(true);
      }
    };

    var dragleave = function dragleave(e) {
      // if we don't have an element we are going to, we are going outside the window
      if (e.relatedTarget == null) {
        setOver(false);
      }
    };

    window.addEventListener('drop', drop, {
      passive: true
    });
    window.addEventListener('dragenter', dragenter, {
      passive: true
    });
    window.addEventListener('dragleave', dragleave, {
      passive: true
    });
    window.addEventListener('dragover', dragover, {
      passive: true
    });
    return function () {
      window.removeEventListener('drop', drop);
      window.removeEventListener('dragenter', dragenter);
      window.removeEventListener('dragleave', dragleave);
      window.removeEventListener('dragenter', dragover);
    };
  }, []);
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-dropzone', className),
    onDrop: handleDrop,
    style: style
  }, children, over && React__default.createElement("div", {
    className: "ui-dropzone__hover-container"
  }, React__default.createElement("div", {
    className: "ui-dropzone__hover-content"
  }, React__default.createElement(Icon, {
    path: js.mdiFileUploadOutline,
    size: 48,
    color: "#aaaaaa"
  }), React__default.createElement("p", {
    className: "ui-dropzone__hover-text"
  }, "Drop files here"))));
};

var css_248z$g = ".ui-fab{position:fixed;bottom:20px;right:20px;z-index:999996;height:56px;min-width:56px;display:flex;align-items:center;justify-content:center;border-radius:28px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);cursor:pointer;transition:transform .2s,opacity .2s;padding:0 16px}.ui-fab__text{white-space:nowrap;margin:0 4px 0 12px;font-family:Roboto,sans-serif;transition:margin .2s,width .2s,opacity .2s .1s;width:auto}.ui-fab__text--hidden{width:0;opacity:0;margin:0;transition:margin .2s,width .2s,opacity 0s}.ui-fab:active,.ui-fab:hover{box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)}.ui-fab--hidden{transform:scale(0);opacity:0;pointer-events:none}";
styleInject(css_248z$g);

/**
 * Floating action button (FAB)
 */

var Fab = function Fab(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      path = _ref.path,
      color = _ref.color,
      onClick = _ref.onClick,
      compact = _ref.compact,
      hidden = _ref.hidden,
      text = _ref.text;
  var fg = useForeground(color);
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-fab', {
      'ui-fab--hidden': hidden
    }, className),
    style: _extends({
      backgroundColor: color,
      color: fg
    }, style),
    onClick: onClick
  }, React__default.createElement(Icon, {
    size: 24,
    path: path,
    color: fg
  }), React__default.createElement("div", {
    className: merge("ui-fab__text", {
      'ui-fab__text--hidden': compact
    })
  }, text));
};

/**
 * Form element with onSubmit prevented by default.
 */

var Form = function Form(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children;
  return React__default.createElement("form", {
    id: id,
    className: merge('ui-form', className),
    style: style,
    onSubmit: function onSubmit(e) {
      return e.preventDefault();
    }
  }, children);
};

/**
 * Generate an error object, useful for throwing inside a catch block.
 */
function error(code, message) {
  if (code === void 0) {
    code = "@general/unknown-error";
  }

  if (message === void 0) {
    message = "Something went wrong. Please try again.";
  }

  return {
    code: code,
    message: message
  };
}

/**
 * Checks if an email is valid
 */
function isEmail(email) {
  // from [https://emailregex.com/](https://emailregex.com/)
  var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return regex.test(email);
}

var css_248z$h = "@-webkit-keyframes error__in{0%{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}@keyframes error__in{0%{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}.ui-input{position:relative;padding-bottom:20px;display:block}.ui-input__container{display:flex;align-items:center;position:relative;border:1px solid #afafaf;border-radius:3px;font-family:Roboto,sans-serif;min-height:36px;z-index:1}.ui-input__display{background-color:transparent!important;font-size:16px;padding:8px 12px;min-height:36px;border:none;outline:none;z-index:2;font-family:inherit;resize:none;flex-grow:1}.ui-input__label{position:absolute;background-color:transparent;z-index:2;font-size:16px;top:9px;left:8px;color:#969696;padding:0 4px;margin:0;transition:top .2s,font-size .2s;pointer-events:none}.ui-input__label:before{content:\"\";height:calc(50% + 1px);width:100%;position:absolute;left:0;bottom:0;background-color:#fff;z-index:-1}.ui-input__label--float{font-size:10px;top:-6px}.ui-input__error-text{position:absolute;left:12px;bottom:4px;font-size:10px;color:tomato;-webkit-animation:error__in .2s;animation:error__in .2s}.ui-input--margin{margin-bottom:20px}.ui-input--disabled{pointer-events:none}.ui-input--disabled .ui-input__display{border:1px dashed #afafaf}";
styleInject(css_248z$h);

var InputBase = function InputBase(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      type = _ref.type,
      display = _ref.display,
      label = _ref.label,
      margin = _ref.margin,
      required = _ref.required,
      color = _ref.color,
      disabled = _ref.disabled,
      spellcheck = _ref.spellcheck,
      validate = _ref.validate,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      children = _ref.children;

  var _useState = React.useState(false),
      focus = _useState[0],
      setFocus = _useState[1];

  var _useState2 = React.useState(false),
      touched = _useState2[0],
      setTouched = _useState2[1];

  var error = touched ? validate(display) : null;
  var hasValue = display !== undefined && display !== null && display !== '';

  var _onChange = React.useCallback(function (e) {
    return onChange(e.target.value);
  }, [onChange]);

  var _onFocus = React.useCallback(function () {
    if (onFocus) {
      onFocus();
    }

    setFocus(true);
  }, [onFocus]);

  var _onBlur = React.useCallback(function () {
    if (onBlur) {
      onBlur();
    }

    setFocus(false);
    setTouched(true);
  }, [onBlur]);

  var highlight = React.useMemo(function () {
    if (disabled) {
      return undefined;
    }

    if (error) {
      return '#ff6347';
    }

    if (focus) {
      return color;
    }

    return undefined;
  }, [disabled, error, focus, color]);
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-input', {
      'ui-input--disabled': disabled,
      'ui-input--margin': margin
    }, className)
  }, label && React__default.createElement("p", {
    style: {
      color: highlight
    },
    className: merge("ui-input__label", {
      'ui-input__label--float': focus || hasValue
    })
  }, label, required && '*'), React__default.createElement("div", {
    className: "ui-input__container",
    style: _extends({
      border: highlight ? "1px solid " + highlight : undefined
    }, style)
  }, React__default.createElement("input", {
    className: "ui-input__display",
    type: type === 'password' ? 'password' : 'text',
    value: display,
    spellCheck: spellcheck,
    onChange: _onChange,
    onFocus: _onFocus,
    onBlur: _onBlur
  }), children), error && !disabled && React__default.createElement("p", {
    className: "ui-input__error-text"
  }, error.message));
};

var InputEmail = function InputEmail(_ref) {
  var value = _ref.value,
      required = _ref.required,
      props = _objectWithoutPropertiesLoose(_ref, ["value", "required"]);

  var validate = React.useCallback(function (value) {
    if (required && value === '') {
      return error('@ui/input-required', 'Required');
    } else if (!isEmail(value)) {
      return error('@ui/input-email-invalid', 'Email invalid');
    } else {
      return null;
    }
  }, [required]);
  return React__default.createElement(InputBase, Object.assign({
    display: value,
    required: required,
    spellcheck: false,
    validate: validate
  }, props));
};

var InputText = function InputText(_ref) {
  var value = _ref.value,
      required = _ref.required,
      props = _objectWithoutPropertiesLoose(_ref, ["value", "required"]);

  var validate = React.useCallback(function (value) {
    if (required && value === '') {
      return error('@ui/input-required', 'Required');
    } else {
      return null;
    }
  }, [required]);
  return React__default.createElement(InputBase, Object.assign({
    display: value,
    required: required,
    spellcheck: true,
    validate: validate
  }, props));
};

var InputPassword = function InputPassword(_ref) {
  var value = _ref.value,
      required = _ref.required,
      props = _objectWithoutPropertiesLoose(_ref, ["value", "required"]);

  var validate = React.useCallback(function (value) {
    if (required && value === '') {
      return error('@ui/input-required', 'Required');
    } else {
      return null;
    }
  }, [required]);
  return React__default.createElement(InputBase, Object.assign({
    display: value,
    required: required,
    spellcheck: false,
    validate: validate
  }, props));
};

var css_248z$i = ".ui-input-number__units{padding-right:12px;color:#969696}.ui-input-number__controls{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:0 9px;border-left:1px solid #afafaf;overflow:hidden}";
styleInject(css_248z$i);

var InputNumber = function InputNumber(_ref) {
  var value = _ref.value,
      required = _ref.required,
      step = _ref.step,
      precision = _ref.precision,
      units = _ref.units,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      props = _objectWithoutPropertiesLoose(_ref, ["value", "required", "step", "precision", "units", "onChange", "onBlur"]);

  var toValue = React.useCallback(function (value) {
    if (value === undefined || value === '') {
      return undefined;
    } else {
      return parseFloat(value);
    }
  }, []);
  var toPrecision = React.useCallback(function (value) {
    if (value === undefined || value === '') {
      return '';
    } else {
      return new Big(value).toFixed(precision);
    }
  }, [precision]);

  var _useState = React.useState(toPrecision(value)),
      display = _useState[0],
      setDisplay = _useState[1];

  React.useEffect(function () {
    return setDisplay(toPrecision(value));
  }, [value, toPrecision]);
  var validate = React.useCallback(function (display) {
    if (!required && display === '') {
      return null;
    }

    if (required && display === '') {
      return error('@ui/input-required', 'Required');
    }

    try {
      new Big(display); // big has stricter parsing so use for number validation
    } catch (e) {
      return error('@ui/input-invalid', 'Invalid number');
    }

    return null;
  }, [required]);

  var _onBlur = React.useCallback(function () {
    try {
      var val = toPrecision(display); // force precision and force valid numbers

      var parsed = toValue(val);
      setDisplay(val);
      onChange(parsed);
    } catch (e) {}

    if (onBlur) {
      onBlur();
    }
  }, [onBlur, toPrecision, toValue, display, value]);

  var onIncrease = React.useCallback(function () {
    if (value !== undefined) {
      var val = new Big(value).plus(step).toFixed(precision);
      var parsed = parseFloat(val);
      setDisplay(val);
      onChange(parsed);
    }
  }, [step, value, display, error, precision, onChange]);
  var onDecrease = React.useCallback(function () {
    if (value !== undefined) {
      var val = new Big(value).minus(step).toFixed(precision);
      var parsed = parseFloat(val);
      setDisplay(val);
      onChange(parsed);
    }
  }, [step, value, display, error, precision, onChange]);
  return React__default.createElement(InputBase, Object.assign({
    display: display,
    required: required,
    spellcheck: false,
    validate: validate,
    onBlur: _onBlur,
    onChange: setDisplay
  }, props), units && React__default.createElement("p", {
    className: "ui-input-number__units"
  }, units), React__default.createElement("div", {
    className: "ui-input-number__controls"
  }, React__default.createElement(Icon, {
    path: js.mdiChevronUp,
    size: 18,
    color: "#000000",
    onClick: onIncrease
  }), React__default.createElement(Icon, {
    path: js.mdiChevronDown,
    size: 18,
    color: "#000000",
    onClick: onDecrease
  })));
};

/**
 * Input element with types: 'email' | 'password' | 'text' | 'number'.
 */

var Input = function Input(props) {
  switch (props.type) {
    case 'email':
      return React__default.createElement(InputEmail, Object.assign({}, props));

    case 'password':
      return React__default.createElement(InputPassword, Object.assign({}, props));

    case 'number':
      return React__default.createElement(InputNumber, Object.assign({}, props));

    case 'text':
    default:
      return React__default.createElement(InputText, Object.assign({}, props));
  }
};

var css_248z$j = ".ui-list-item{display:flex;align-items:center;justify-content:space-between;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:12px 20px;cursor:pointer}.ui-list-item--hover:hover{background-color:rgba(0,0,0,.1)}.ui-list-item--disabled{opacity:.4;pointer-events:none}";
styleInject(css_248z$j);

/**
 * List Item with default hover styles if onClick present.
 */

var ListItem = function ListItem(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      children = _ref.children;
  return React__default.createElement("div", {
    id: id,
    className: merge("ui-list-item", {
      'ui-list-item--hover': !!onClick,
      'ui-list-item--disabled': disabled
    }, className),
    style: style,
    onClick: onClick
  }, children);
};

var css_248z$k = ".ui-menu-bar-item{display:flex;align-items:center;position:relative;padding:0 12px;height:100%;border-radius:3px;cursor:pointer}.ui-menu-bar-item--selected,.ui-menu-bar-item:hover{background-color:#ebebeb}.ui-menu-bar-item__card{position:absolute;top:100%;left:0;max-height:calc(100vh - 76px);min-width:200px;overflow:auto}";
styleInject(css_248z$k);

var MenuBarItem = function MenuBarItem(_ref) {
  var children = _ref.children;
  return React__default.createElement(React__default.Fragment, null, children);
};
var MenuBarItemExtended = function MenuBarItemExtended(_ref2) {
  var id = _ref2.id,
      className = _ref2.className,
      style = _ref2.style,
      selected = _ref2.selected,
      label = _ref2.label,
      onSelect = _ref2.onSelect,
      children = _ref2.children;
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-menu-bar-item', {
      'ui-menu-bar-item--selected': selected
    }, className),
    style: style,
    onPointerEnter: function onPointerEnter() {
      return onSelect(label);
    }
  }, label, selected && React__default.createElement(Card, {
    className: "ui-menu-bar-item__card"
  }, children));
};

var css_248z$l = ".ui-menu-bar{position:relative;display:flex;align-items:center;justify-content:flex-start;height:28px;background-color:#fff;width:100%;z-index:100000}";
styleInject(css_248z$l);

var MenuBar = function MenuBar(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children;

  // is the menu bar currently active?
  var _useState = React.useState(false),
      active = _useState[0],
      setActive = _useState[1]; // which item is currently selected


  var _useState2 = React.useState(''),
      selection = _useState2[0],
      setSelection = _useState2[1];

  return React__default.createElement("div", {
    id: id,
    className: merge('ui-menu-bar', className),
    style: style,
    onClick: function onClick() {
      return setActive(function (o) {
        return !o;
      });
    }
  }, React.Children.map(children, function (child) {
    return React__default.createElement(MenuBarItemExtended, Object.assign({}, child.props, {
      selected: active && child.props.label === selection,
      onSelect: setSelection
    }));
  }));
};

/**
 * Option to be used with Select element.
 */

var Option = function Option(_ref) {
  var children = _ref.children;
  return React__default.createElement(React.Fragment, null, children);
};

var css_248z$m = "@-webkit-keyframes ui-progress{0%{transform:translateX(-100%);left:0}to{transform:translateX(0);left:100%}}@keyframes ui-progress{0%{transform:translateX(-100%);left:0}to{transform:translateX(0);left:100%}}.ui-progress{position:relative;height:4px;width:100%;transition:height .2s;overflow:hidden}.ui-progress__indicator{position:absolute;top:0;left:0;height:100%;transition:width .2s}.ui-progress--indeterminate .ui-progress__indicator{-webkit-animation-name:ui-progress;animation-name:ui-progress;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-fill-mode:both;animation-fill-mode:both;width:25%}.ui-progress--hidden{height:0}";
styleInject(css_248z$m);

/**
 * Progress component. Can be indeterminate or determinate to show working state or progres.
 */

var Progress = function Progress(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      color = _ref.color,
      percent = _ref.percent,
      hidden = _ref.hidden;
  var bg = useAlpha(color, .2);
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-progress', {
      'ui-progress--indeterminate': percent === undefined,
      'ui-progress--hidden': hidden
    }, className),
    style: _extends({
      backgroundColor: bg
    }, style)
  }, React__default.createElement("div", {
    className: "ui-progress__indicator",
    style: {
      width: percent + "%",
      backgroundColor: color
    }
  }));
};

var css_248z$n = ".ui-section__container{display:block;padding:40px}.ui-section__content{display:block;margin-left:auto;margin-right:auto;width:100%}";
styleInject(css_248z$n);

/**
 * Section component.
 */

var Section = function Section(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      width = _ref.width,
      children = _ref.children;
  return React__default.createElement("section", {
    id: id,
    className: merge('ui-section__container', className),
    style: style
  }, React__default.createElement("div", {
    className: "ui-section__content",
    style: {
      maxWidth: width
    }
  }, children));
};

var css_248z$o = ".ui-select{padding-bottom:0}.ui-select__container{cursor:pointer}.ui-select__icon{margin-right:12px}.ui-select__card{position:absolute;top:100%;left:0;width:100%;transform:translateZ(0);z-index:10;overflow:auto;padding:8px 0;touch-action:pan-y;max-height:0;opacity:0;transition:max-height .2s,opacity .2s;pointer-events:none}.ui-select__card--up{top:auto;bottom:100%}.ui-select__card--open{opacity:1;max-height:140px;pointer-events:all}.ui-select__card *{touch-action:pan-y}.ui-select__item{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:8px 12px;cursor:pointer}.ui-select__item:hover{background-color:rgba(0,0,0,.1)}";
styleInject(css_248z$o);

/**
 * Select component to be used with the Option component.
 */

var Select = function Select(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      value = _ref.value,
      margin = _ref.margin,
      children = _ref.children,
      label = _ref.label,
      onChange = _ref.onChange,
      color = _ref.color,
      disabled = _ref.disabled,
      direction = _ref.direction;

  var _useState = React.useState(false),
      focus = _useState[0],
      setFocus = _useState[1];

  var element = React.useRef(null);
  var open = useDelayBoolean(focus, 400);
  var display = React.useMemo(function () {
    var _display = '';
    React__default.Children.forEach(children, function (child) {
      if (child.props.value === value) {
        _display = child.props.displayAs;
      }
    });
    return _display;
  }, [value, children]); // auto close

  React.useEffect(function () {
    var cb = function cb(e) {
      if (!element.current || !element.current.contains(e.target)) {
        setFocus(false);
      } else {
        setFocus(function (o) {
          return !o;
        });
      }
    };

    document.addEventListener('click', cb);
    return function () {
      return document.removeEventListener('click', cb);
    };
  }, [element]);
  var highlight = React.useMemo(function () {
    if (disabled) {
      return undefined;
    }

    if (focus) {
      return color;
    }

    return undefined;
  }, [disabled, focus, color]);
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-select', 'ui-input', {
      'ui-input--disabled': disabled,
      'ui-input--margin': margin
    }, className),
    style: style,
    ref: element
  }, label && React__default.createElement("p", {
    style: {
      color: focus ? color : undefined
    },
    className: "ui-input__label ui-input__label--float"
  }, label, "*"), React__default.createElement("div", {
    className: "ui-select__container ui-input__container",
    style: _extends({
      border: highlight ? "1px solid " + highlight : undefined
    }, style)
  }, React__default.createElement("p", {
    className: "ui-input__display"
  }, display), React__default.createElement(Icon, {
    className: "ui-select__icon",
    style: {
      transform: focus ? 'rotateZ(180deg)' : undefined
    },
    size: 24,
    color: "#777777",
    path: js.mdiChevronDown
  })), React__default.createElement(Card, {
    className: merge("ui-select__card", {
      'ui-select__card--open': focus,
      'ui-select__card--up': direction === 'up'
    })
  }, open && React__default.Children.map(children, function (child) {
    return React__default.createElement("div", {
      key: child.props.value,
      className: "ui-select__item",
      onClick: function onClick() {
        onChange(child.props.value);
      }
    }, child);
  })));
};

var css_248z$p = ".ui-subheader{text-transform:uppercase;font-size:12px;font-weight:700;margin:0 0 20px;color:#323232}";
styleInject(css_248z$p);

/**
 * Google tasks style subheader component. Small, bold and capitalized.
 */

var Subheader = function Subheader(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children;
  return React__default.createElement("p", {
    id: id,
    className: merge("ui-subheader", className),
    style: style
  }, children);
};

var css_248z$q = ".ui-switch{display:flex;justify-content:flex-start;align-items:center}.ui-switch,.ui-switch__track{position:relative;height:14px}.ui-switch__track{display:block;width:36px;min-width:36px;border-radius:7px;background-color:rgba(0,0,0,.26);transition:background-color .2s}.ui-switch__button{position:absolute;top:-3px;left:-3px;display:block;width:20px;height:20px;border-radius:50%;background-color:#fafafa;transition:background-color .2s,left .2s;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}.ui-switch--disabled{pointer-events:none}.ui-switch--disabled .ui-switch__track{background-color:rgba(0,0,0,.12)!important}.ui-switch--disabled .ui-switch__button{background-color:#bdbdbd!important}";
styleInject(css_248z$q);

/**
 * Switch component.
 */

var Switch = function Switch(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      value = _ref.value,
      disabled = _ref.disabled,
      color = _ref.color,
      onChange = _ref.onChange;
  var bg = useAlpha(color, .4);
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-switch', {
      'ui-switch--active': value,
      'ui-switch--disabled': disabled
    }, className),
    style: style,
    onClick: function onClick() {
      return onChange && onChange(!value);
    }
  }, React__default.createElement("div", {
    className: "ui-switch__track",
    style: {
      backgroundColor: value ? bg : undefined
    }
  }), React__default.createElement("div", {
    className: "ui-switch__button",
    style: {
      backgroundColor: value ? color : undefined,
      left: value ? 19 : undefined
    }
  }));
};

var css_248z$r = ".ui-tab{display:flex;align-items:center;justify-content:center;padding:0 16px;min-height:48px;min-width:90px;text-transform:uppercase;z-index:1;cursor:pointer;color:#fff}";
styleInject(css_248z$r);

/**
 * Tab component to be used inside the Tabs component;
 */

var Tab = function Tab(_ref) {
  var children = _ref.children;
  return React__default.createElement(React__default.Fragment, null, children);
};
/**
 * Tab component to be used inside the Tabs component;
 */

var TabExtended = function TabExtended(_ref2) {
  var children = _ref2.children,
      value = _ref2.value,
      selected = _ref2.selected,
      highlight = _ref2.highlight,
      color = _ref2.color,
      onChange = _ref2.onChange,
      setBar = _ref2.setBar;
  var ref = React.useRef(null);

  var _onClick = React.useCallback(function () {
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);

  React.useEffect(function () {
    if (setBar && selected && ref.current) {
      setBar({
        left: ref.current.offsetLeft,
        width: ref.current.offsetWidth
      });
    }
  }, [selected, setBar]);
  return React__default.createElement("div", {
    ref: ref,
    className: "ui-tab",
    style: {
      color: selected ? highlight : color,
      transition: selected ? 'color .2s .1s' : 'color .2s'
    },
    onClick: _onClick
  }, children);
};

var css_248z$s = ".ui-tabs{position:relative;display:inline-flex;align-items:center;justify-content:flex-start;min-height:48px;margin-left:6px}.ui-tabs__bar{position:absolute;bottom:0;height:4px;min-width:90px;transition:width .2s,left .2s;z-index:0;border-radius:3px 3px 0 0}";
styleInject(css_248z$s);

/**
 * Tabs component used with the Tab ccomponent.
 */

var Tabs = function Tabs(_ref) {
  var children = _ref.children,
      value = _ref.value,
      onChange = _ref.onChange,
      color = _ref.color,
      highlight = _ref.highlight,
      className = _ref.className;

  var _useState = React.useState({
    left: 0,
    width: 90
  }),
      bar = _useState[0],
      setBar = _useState[1];

  return React__default.createElement("div", {
    className: merge("ui-tabs", className)
  }, React.Children.map(children, function (child) {
    return React__default.createElement(TabExtended, Object.assign({}, child.props, {
      selected: value === child.props.value,
      color: color,
      highlight: highlight,
      onChange: onChange,
      setBar: setBar
    }));
  }), React__default.createElement("div", {
    className: "ui-tabs__bar",
    style: _extends({
      backgroundColor: highlight
    }, bar)
  }));
};

var css_248z$t = ".ui-textarea__container{display:block}.ui-textarea__display{position:absolute;top:0;left:0;width:100%;height:100%}.ui-textarea__slave{position:relative;white-space:pre-line;pointer-events:none;width:100%;visibility:hidden;min-height:54px}";
styleInject(css_248z$t);

/**
 * Auto expanding textarea component.
 */

var Textarea = function Textarea(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      value = _ref.value,
      label = _ref.label,
      required = _ref.required,
      color = _ref.color,
      disabled = _ref.disabled,
      spellcheck = _ref.spellcheck,
      _onChange = _ref.onChange;
  var validate = React.useCallback(function (value) {
    if (required && value === '') {
      return 'Required';
    } else {
      return null;
    }
  }, [required]);

  var _useState = React.useState(false),
      focus = _useState[0],
      setFocus = _useState[1];

  var _useState2 = React.useState(false),
      touched = _useState2[0],
      setTouched = _useState2[1];

  var error = touched ? validate(value) : null;
  var hasValue = value !== undefined && value !== null && value !== '';
  var highlight = React.useMemo(function () {
    if (error) {
      return '#ff6347';
    }

    if (focus) {
      return color;
    }

    return undefined;
  }, [error, focus, color]);
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-textarea', 'ui-input', {
      'ui-input--disabled': disabled
    }, className)
  }, label && React__default.createElement("p", {
    style: {
      color: highlight
    },
    className: merge("ui-input__label", {
      'ui-input__label--float': focus || hasValue
    })
  }, label, required && '*'), React__default.createElement("div", {
    className: "ui-input__container ui-textarea__container",
    style: _extends({
      border: highlight ? "1px solid " + highlight : undefined
    }, style)
  }, React__default.createElement("textarea", {
    className: "ui-input__display ui-textarea__display",
    value: value,
    spellCheck: spellcheck,
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    },
    onFocus: function onFocus() {
      return setFocus(true);
    },
    onBlur: function onBlur() {
      setFocus(false);
      setTouched(true);
    }
  }), React__default.createElement("div", {
    className: "ui-input__display ui-textarea__slave"
  }, value, '\n')), error && React__default.createElement("p", {
    className: "ui-input__error-text"
  }, error));
};

var css_248z$u = "@-webkit-keyframes ui-toast-in{0%{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}@keyframes ui-toast-in{0%{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}.ui-toast{position:fixed;bottom:20px;left:20px;background-color:#323232;color:#fff;-webkit-animation:ui-toast-in .3s;animation:ui-toast-in .3s;-webkit-animation-fill-mode:backwards;animation-fill-mode:backwards;padding:0 0 0 20px;display:flex;align-items:center;min-width:288px;min-height:48px;z-index:10000000;border-radius:2px;transition:transform .4s,opacity .4s}.ui-toast__text{flex-grow:1;margin-right:20px}.ui-toast__button{color:#fff;border:1px solid transparent!important;box-shadow:none!important}.ui-toast--hide{opacity:0;transform:translateY(100%)}@media (max-width:500px){.ui-toast{position:fixed;bottom:0;left:0;width:100%;border-radius:0}}";
styleInject(css_248z$u);

/**
 * Internal component used by the Toast component.
 */

var ToastEntry = function ToastEntry(_ref) {
  var color = _ref.color,
      toast = _ref.toast,
      onDestroy = _ref.onDestroy;

  var _useState = React.useState(false),
      hidden = _useState[0],
      setHidden = _useState[1];

  var _useState2 = React.useState(),
      selfCombustTimeout = _useState2[0],
      setSelfCombustTimeout = _useState2[1];

  React.useEffect(function () {
    setHidden(false);
    var timeout = setTimeout(function () {
      if (toast.onTimeout) {
        toast.onTimeout();
      }

      setHidden(true);
      setTimeout(function () {
        return onDestroy(toast.key);
      }, 500);
    }, toast.duration);
    setSelfCombustTimeout(timeout);
  }, [toast, onDestroy]);
  var onClick = React.useCallback(function () {
    clearTimeout(selfCombustTimeout);

    if (toast.onClick) {
      toast.onClick();
    }

    setHidden(true);
    setTimeout(function () {
      return onDestroy(toast.key);
    }, 500);
  }, [toast, selfCombustTimeout, onDestroy]);
  return React__default.createElement("div", {
    key: toast.key,
    className: merge('ui-toast', {
      'ui-toast--hide': hidden
    })
  }, React__default.createElement("span", {
    className: "ui-toast__text"
  }, toast.text), toast.onClick && React__default.createElement(Button, {
    className: "ui-toast__button",
    compact: true,
    color: color,
    outline: true,
    onClick: onClick
  }, toast.button || 'Cancel'));
};

var Toast = function Toast(_ref) {
  var color = _ref.color,
      toasts = _ref.toasts,
      onDestroy = _ref.onDestroy;
  return React__default.createElement(React.Fragment, null, toasts.map(function (toast) {
    return React__default.createElement(ToastEntry, {
      key: toast.key,
      color: color,
      toast: toast,
      onDestroy: onDestroy
    });
  }));
};

var css_248z$v = ".ui-transition{display:block;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes ui-transition__swipe-up{0%{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes ui-transition__swipe-up{0%{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}.ui-transition--swipe-up{-webkit-animation:ui-transition__swipe-up .4s;animation:ui-transition__swipe-up .4s}@-webkit-keyframes ui-transition__fade-in{0%{opacity:0}to{opacity:1}}@keyframes ui-transition__fade-in{0%{opacity:0}to{opacity:1}}.ui-transition--fade-in{-webkit-animation:ui-transition__fade-in .4s;animation:ui-transition__fade-in .4s}";
styleInject(css_248z$v);

/**
 * Basic animation in for elements.
 */

var Transition = function Transition(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      type = _ref.type,
      children = _ref.children;
  return React__default.createElement("div", {
    id: id,
    className: merge('ui-transition', className, {
      'ui-transition--swipe-up': type === 'swipeUp',
      'ui-transition--fade-in': type === 'fadeIn'
    }),
    style: style
  }, children);
};

/**
 * Hook: injects dynamic css into the DOM.
 */

function useStyles() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  React.useEffect(function () {
    var style = document.createElement("style");
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    var sheet = style.sheet;
    args.forEach(function (css) {
      sheet.insertRule(css);
    });
    return function () {
      style.remove();
    };
  }, [args]);
}

var css_248z$w = ".markdown-content{font-size:14px}.markdown-content h1,.markdown-content h2,.markdown-content h3,.markdown-content h4{margin-bottom:20px}.markdown-content p{margin-bottom:20px;font-size:14px;padding:0 20px;margin-top:20px}.markdown-content p:last-child{margin-bottom:0}.markdown-content h2{font-size:14px;font-weight:700;background-color:#c8c8c8;padding:20px}.markdown-content h3{font-size:14px;font-weight:700;padding:0 20px}.markdown-content code{padding:1px 2px;background-color:rgba(0,0,0,.1)!important}.markdown-content pre code{display:block;padding:20px;border-left:4px solid #fff;background-color:rgba(0,0,0,.1)!important;margin-bottom:20px}.markdown-content pre,.markdown-content pre *{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;cursor:text}.markdown-content blockquote{position:relative;display:block;padding:20px;margin:0 0 20px;line-height:1.4em}.markdown-content a:hover{text-decoration:underline}.markdown-content img{width:100%}.markdown-content ul{list-style:none;margin:0 0 20px;padding:0 20px}.markdown-content ol{color:rgba(0,0,0,.7);list-style:upper-roman}";
styleInject(css_248z$w);

var MarkdownContent = function MarkdownContent(_ref) {
  var className = _ref.className,
      markdown = _ref.markdown,
      theme = _ref.theme;
  var faded = useAlpha(theme, .1);
  useStyles(".markdown-content blockquote { border-left: 4px solid " + theme + "; background-color: " + faded + "; }");
  useStyles(".markdown-content a { color: " + theme + "; }");
  useStyles(".markdown-content blockquote > p { color: " + theme + "; }");
  var html = React.useMemo(function () {
    var converter = new showdown.Converter({
      extensions: [showdownHighlight],
      openLinksInNewWindow: true
    });
    return {
      __html: converter.makeHtml(markdown)
    };
  }, [markdown]);
  return React__default.createElement("div", {
    className: merge("markdown-content", className),
    dangerouslySetInnerHTML: html
  });
};

var styles = "\n    body {\n        margin: 20px;\n        font-family: monospace;\n    }\n    .prop {\n        position: relative;\n        margin-left: 20px;\n        pointer-events: none;\n    }\n    .prop__caret {\n        position: absolute;\n        top: 4px;\n        left: -12px;\n        cursor: pointer;\n        pointer-events: all;\n    }\n    .prop > .prop {\n        display: none;\n    }\n    .prop > .prop__placeholder {\n        display: inline-block;\n        cursor: pointer;\n        pointer-events: all;\n    }\n    .prop > .prop__caret--right {\n        display: block;\n    }\n    .prop > .prop__caret--down {\n        display: none;\n    }\n    .prop__expand > .prop {\n        display: block !important;\n    }\n    .prop__expand > .prop__placeholder {\n        display: none !important;\n    }\n    .prop__expand > .prop__caret--right {\n        display: none;\n    }\n    .prop__expand > .prop__caret--down {\n        display: block;\n    }\n    .prop__key {\n        color: purple;\n    }\n    .prop__value--undefined,\n    .prop__value--null {\n        color: green;\n    }\n    .prop__value--string {\n        color: red;\n    }\n    .prop__value--number,\n    .prop__value--boolean {\n        color: blue;\n    }\n";
var right = '<svg class="prop__caret prop__caret--right" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24"><path fill="grey" d="M21 12l-18 12v-24z"/></svg>';
var down = '<svg class="prop__caret prop__caret--down" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24"><path fill="grey" d="M12 21l-12-18h24z"/></svg>';

function parse(win, key, val, path) {
  if (val === undefined) {
    return "<div class=\"prop\"><span class=\"prop__key\">" + key + "</span><span>:</span> <span class=\"prop__value\">\"<span class=\"prop__value--undefined\">undefined</span>\"</span></div>";
  }

  if (val === null) {
    return "<div class=\"prop\"><span class=\"prop__key\">" + key + "</span><span>:</span> <span class=\"prop__value\">\"<span class=\"prop__value--null\">null</span>\"</span></div>";
  }

  if (isString(val)) {
    return "<div class=\"prop\"><span class=\"prop__key\">" + key + "</span><span>:</span> <span class=\"prop__value\">\"<span class=\"prop__value--string\">" + val + "</span>\"</span></div>";
  }

  if (isNumber(val)) {
    return "<div class=\"prop\"><span class=\"prop__key\">" + key + "</span><span>:</span> <span class=\"prop__value prop__value--number\">" + val + "</span></div>";
  }

  if (isBoolean(val)) {
    return "<div class=\"prop\"><span class=\"prop__key\">" + key + "</span><span>:</span> <span class=\"prop__value prop__value--boolean\">" + val + "</span></div>";
  }

  if (Array.isArray(val)) {
    var props = val.map(function (_key, i) {
      return parse(win, "" + i, _key, path + key);
    });
    var html = props.join('');
    return "<div class=\"prop " + (win.__expanded[path + key] ? 'prop__expand' : '') + "\" onclick=\"this.classList.toggle('prop__expand'); window.__expanded['" + (path + key) + "'] = this.classList.contains('prop__expand'); event.stopPropagation();\">" + right + down + "<span class=\"prop__key\">" + key + "</span><span>:</span> <span>[</span>" + html + (html !== '' ? '<span class="prop__placeholder">...</span>' : '') + "<span>]</span></div>";
  }

  if (isObject(val)) {
    var _val = val;
    var keys = Object.keys(_val);

    var _props = keys.map(function (_key) {
      return parse(win, _key, _val[_key], path + key);
    });

    var _html = _props.join('');

    return "<div class=\"prop " + (win.__expanded[path + key] ? 'prop__expand' : '') + "\" onclick=\"this.classList.toggle('prop__expand'); window.__expanded['" + (path + key) + "'] = this.classList.contains('prop__expand'); event.stopPropagation();\">" + right + down + "<span class=\"prop__key\">" + key + "</span><span>:</span> " + (_html === '' ? '{}' : _html) + (_html !== '' ? "<span class=\"prop__placeholder\">{...}</span>" : '') + "</div>";
  }

  return '';
}
/**
 * Hook: Logs state to a seperate window, auto updating with the most current values.
 */


function useLog(obj, rootName) {
  var _useState = React.useState(null),
      win = _useState[0],
      setWin = _useState[1]; // init


  React.useEffect(function () {
    var view = window.open('', '@ui/debug', 'menubar=no,toolbar=no,location=no,titlebar=no,status=no');

    if (view) {
      if (!view.__expanded) {
        view.__expanded = {};
      }

      var style = view.document.createElement('style');
      style.innerHTML = styles;
      view.document.head.appendChild(style);
      setWin(view);
    }
  }, []); // render updates

  React.useEffect(function () {
    if (win) {
      win.document.body.innerHTML = parse(win, rootName, obj, '');
    }
  }, [win, obj, rootName]);
}

/**
 * Super simple pluralizer convenience method.
 */

function usePluralize(num, single, plural) {
  return React.useMemo(function () {
    return num === 1 ? single : plural;
  }, [num, single, plural]);
}

/**
 * Hook: Generates a array of colors of length 'count'. Minimum number of colors is 7.
 */

function useRainbow(count) {
  return React.useMemo(function () {
    var len = count > 7 ? count : 7;
    var offset = 206;
    var width = 359 - 100;
    var step = Math.floor(width / len);
    return Array(len).fill('').map(function (_entry, i) {
      var base = step * i + offset;
      var color = "hsl(" + (base > 359 ? base - 359 : base) + ", 100%, 35%)";
      return color;
    });
  }, [count]);
}

/**
 * Hook: listener for scroll event - returns Y scroll offset.
 */

function useScrollListener() {
  var _useState = React.useState(0.0),
      y = _useState[0],
      setY = _useState[1];

  React.useEffect(function () {
    var cb = function cb() {
      setY(window.scrollY);
    };

    window.addEventListener('scroll', cb, {
      passive: true
    });
    return function () {
      window.removeEventListener('scroll', cb);
    };
  });
  return y;
}

/**
 * Hook: Set the browser theme dynamically;
 */

function useTheme(color) {
  React.useEffect(function () {
    var metaThemeColor = document.querySelector("meta[name=theme-color]");

    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", color);
    } else {
      var el = document.createElement('meta');
      el.setAttribute('name', 'theme-color');
      el.setAttribute('content', color);
    }
  }, [color]);
}

/**
 * Hook: Listens for window resize and returns width and height;
 */

function useWindowResizeListener() {
  var _useState = React.useState(window.innerWidth),
      width = _useState[0],
      setWidth = _useState[1];

  var _useState2 = React.useState(window.innerHeight),
      height = _useState2[0],
      setHeight = _useState2[1];

  React.useEffect(function () {
    var cb = function cb() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', cb, {
      passive: true
    });
    return function () {
      window.removeEventListener('resize', cb);
    };
  });
  return {
    width: width,
    height: height
  };
}

/**
 * A utility function that opens the system file picker and returs the selected files
 * inside a promise.
 */

function chooseFiles(config) {
  var input = document.createElement('input');
  input.type = 'file';
  input.style.position = 'fixed';
  input.style.visibility = 'hidden';
  input.style.left = '-100000px';
  input.style.top = '-100000px';

  if (config) {
    if (config.accept) {
      input.accept = config.accept.join(',');
    }

    if (config.multiple) {
      input.multiple = config.multiple;
    }
  }

  document.body.appendChild(input);
  return new Promise(function (resolve, _reject) {
    var timeout;

    var focus = function focus() {
      timeout = setTimeout(change, 500);
    };

    var change = function change() {
      clearTimeout(timeout);
      window.removeEventListener('focus', focus);
      input.removeEventListener('change', change);
      var files = input.files ? Array.from(input.files) : [];
      var filtered = files.filter(function (file) {
        return fileAccepted(file, config && config.accept);
      });
      resolve({
        files: filtered,
        discarded: files.length - filtered.length
      });
      input.remove();
    }; // slightly shit, the change event always fires slightly after the focus event
    // input.files not updated until change fired so we have to wait after focus event
    // to see if it's a file select or actual just a cancel


    window.addEventListener('focus', focus);
    input.addEventListener('change', change);
    input.click();
  });
}

/**
 * Generate a Promise that will be resolved after specified duration.
 */
var wait = function wait(duration) {
  if (duration === void 0) {
    duration = 1000;
  }

  try {
    return Promise.resolve(new Promise(function (resolve) {
      setTimeout(resolve, duration);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

exports.Appbar = Appbar;
exports.Avatar = Avatar;
exports.Backdrop = Backdrop;
exports.BottomSheet = BottomSheet;
exports.Button = Button;
exports.Card = Card;
exports.Checkbox = Checkbox;
exports.Content = Content;
exports.Dialog = Dialog;
exports.Divider = Divider;
exports.Drawer = Drawer;
exports.DropFiles = DropFiles;
exports.Fab = Fab;
exports.Form = Form;
exports.Icon = Icon;
exports.Input = Input;
exports.ListItem = ListItem;
exports.MarkdownContent = MarkdownContent;
exports.MenuBar = MenuBar;
exports.MenuBarItem = MenuBarItem;
exports.Option = Option;
exports.Portal = Portal;
exports.Progress = Progress;
exports.Section = Section;
exports.Select = Select;
exports.Spinner = Spinner;
exports.Subheader = Subheader;
exports.Switch = Switch;
exports.Tab = Tab;
exports.Tabs = Tabs;
exports.Textarea = Textarea;
exports.Toast = Toast;
exports.Transition = Transition;
exports.chooseFiles = chooseFiles;
exports.error = error;
exports.fileAccepted = fileAccepted;
exports.isEmail = isEmail;
exports.merge = merge;
exports.useAlpha = useAlpha;
exports.useDelayBoolean = useDelayBoolean;
exports.useForeground = useForeground;
exports.useLog = useLog;
exports.usePluralize = usePluralize;
exports.useRainbow = useRainbow;
exports.useScrollListener = useScrollListener;
exports.useStyles = useStyles;
exports.useTheme = useTheme;
exports.useWindowResizeListener = useWindowResizeListener;
exports.wait = wait;
//# sourceMappingURL=solo-ui.cjs.development.js.map
