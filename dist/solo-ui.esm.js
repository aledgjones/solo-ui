import 'app-reset/app-reset.css';
import React, { useMemo, useState, useEffect, useCallback, Fragment, useRef, Children } from 'react';
import isString from 'lodash.isstring';
import isObject from 'lodash.isobject';
import Color from 'color';
import ReactDOM from 'react-dom';
import Big from 'big.js';
import { mdiCheck, mdiFileUploadOutline, mdiChevronUp, mdiChevronDown, mdiAlertBox } from '@mdi/js';
import isemail from 'isemail';
import 'shortid';
import { Converter } from 'showdown';
import showdownHighlight from 'showdown-highlight';
import 'highlight.js/styles/vs2015.css';
import isNumber from 'lodash.isnumber';
import isBoolean from 'lodash.isboolean';

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

/**
 * A basic top of screen app bar with dynamic shadow.
 */

var Appbar = function Appbar(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      shadow = _ref.shadow,
      children = _ref.children;
  return React.createElement("header", {
    id: id,
    className: merge('ui-appbar', {
      'ui-appbar--shadow': shadow
    }, className),
    style: style
  }, React.createElement("div", {
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
  return useMemo(function () {
    return Color(color).isDark() ? '#ffffff' : '#000000';
  }, [color]);
}

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

  var _useState = useState(false),
      isImageValid = _useState[0],
      setIsImageValid = _useState[1];

  useEffect(function () {
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
  return React.createElement("div", {
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
  }, !isImageValid && React.createElement("span", {
    className: "ui-avatar__letter"
  }, letter));
};

/**
 * Backdrop component used for overlays (dialogs, sheets etc.)
 */

var Backdrop = function Backdrop(_ref) {
  var id = _ref.id,
      className = _ref.className,
      open = _ref.open,
      transparent = _ref.transparent,
      onClick = _ref.onClick;
  return React.createElement("div", {
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
  var _useState = useState(false),
      slave = _useState[0],
      setSlave = _useState[1];

  useEffect(function () {
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

/**
 * Create a portal. Useful to contain dialogs, overlays etc.
 */

var Portal = function Portal(_ref) {
  var children = _ref.children;

  var _useState = useState(),
      container = _useState[0],
      setContainer = _useState[1];

  useEffect(function () {
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
  return React.createElement(Portal, null, React.createElement(Backdrop, {
    open: open,
    onClick: onClose
  }), React.createElement("div", {
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

  var _useMemo = useMemo(function () {
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
  return React.createElement("svg", {
    id: id,
    className: merge('ui-spinner', {
      'ui-spinner--animate': animate
    }, className),
    style: _extends({
      height: size,
      width: size
    }, style),
    viewBox: "25 25 50 50"
  }, !animate && React.createElement("circle", {
    className: "ui-spinner__circle",
    cx: "50",
    cy: "50",
    r: "20",
    stroke: "rgb(175, 175, 175)"
  }), React.createElement("circle", {
    className: "ui-spinner__circle",
    cx: "50",
    cy: "50",
    r: "20",
    stroke: color,
    strokeDasharray: dasharray,
    strokeDashoffset: dashoffset
  }));
};

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
  var bg = useMemo(function () {
    if (outline) {
      return 'transparent';
    } else {
      return color;
    }
  }, [color, outline]);
  var fg = useForeground(bg);
  return React.createElement("button", {
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
  }, working && React.createElement(Spinner, {
    className: "ui-spinner--button",
    size: 16,
    color: "rgb(84,84,84)"
  }), children);
};

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
  return React.createElement("div", {
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
  return useMemo(function () {
    return Color(color).alpha(alpha).string();
  }, [color, alpha]);
}

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
      disabled = _ref.disabled,
      onClick = _ref.onClick;
  var bg = useAlpha(color, .1);
  return React.createElement("div", {
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
  }, React.createElement("div", {
    className: "ui-icon__touch-target"
  }), React.createElement("svg", {
    className: "ui-icon__svg",
    viewBox: "0 0 24 24",
    style: {
      width: size,
      height: size
    }
  }, React.createElement("path", {
    d: path,
    style: {
      fill: color
    }
  })), React.createElement("div", {
    className: "ui-icon__blob",
    style: {
      backgroundColor: bg
    }
  }));
};

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
  var onCheckboxChange = useCallback(function () {
    return onChange(!value);
  }, [value, onChange]);
  var fg = useForeground(color);
  return React.createElement("div", {
    id: id,
    className: merge('ui-checkbox', {
      'ui-checkbox--active': value,
      'ui-checkbox--margin': margin,
      'ui-checkbox--disabled': disabled
    }, className),
    style: style,
    onClick: onCheckboxChange
  }, React.createElement("div", {
    className: "ui-checkbox__inner",
    style: {
      marginRight: children ? 20 : 0,
      borderColor: value ? color : undefined,
      backgroundColor: value ? color : undefined
    }
  }, value && React.createElement(Icon, {
    size: 16,
    color: fg,
    className: "ui-checkbox__icon",
    path: mdiCheck
  })), children && React.createElement("div", {
    className: "ui-checkbox__label"
  }, children));
};

/**
 * Content component with default padding.
 */

var Content = function Content(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children;
  return React.createElement("div", {
    id: id,
    className: merge('ui-content', className),
    style: style
  }, children);
};

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
  return React.createElement(Portal, null, React.createElement(Backdrop, {
    className: "ui-dialog__backdrop",
    open: open
  }), React.createElement("div", {
    id: id,
    className: merge("ui-dialog", className, {
      'ui-dialog--show': open
    })
  }, React.createElement("div", {
    className: "ui-dialog__scroller"
  }, React.createElement(Card, {
    className: "ui-dialog__card",
    style: _extends({
      maxWidth: width
    }, style)
  }, render && children()))));
};

/**
 * Simple devider component.
 */

var Divider = function Divider(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      compact = _ref.compact;
  return React.createElement("div", {
    id: id,
    className: merge('ui-divider', {
      'ui-divider--compact': compact
    }, className),
    style: style
  }, children);
};

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
  return React.createElement(Portal, null, React.createElement(Backdrop, {
    open: open,
    onClick: onClose
  }), React.createElement("div", {
    id: id,
    className: merge('ui-drawer', className),
    style: _extends({
      width: width,
      left: -width,
      transform: "translate3d(" + (open ? width : 0) + "px, 0, 0)"
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

  var _useState = useState(false),
      over = _useState[0],
      setOver = _useState[1];

  var handleDrop = useCallback(function (e) {
    if (e.dataTransfer.files.length > 0) {
      var files = Array.from(e.dataTransfer.files);
      var filtered = files.filter(function (file) {
        return fileAccepted(file, accept);
      });
      onDrop(filtered, files.length - filtered.length);
    }
  }, [accept, onDrop]);
  useEffect(function () {
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
  return React.createElement("div", {
    id: id,
    className: merge('ui-dropzone', className),
    onDrop: handleDrop,
    style: style
  }, children, over && React.createElement("div", {
    className: "ui-dropzone__hover-container"
  }, React.createElement("div", {
    className: "ui-dropzone__hover-content"
  }, React.createElement(Icon, {
    path: mdiFileUploadOutline,
    size: 48,
    color: "#aaaaaa"
  }), React.createElement("p", {
    className: "ui-dropzone__hover-text"
  }, "Drop files here"))));
};

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
  return React.createElement("div", {
    id: id,
    className: merge('ui-fab', {
      'ui-fab--hidden': hidden
    }, className),
    style: _extends({
      backgroundColor: color,
      color: fg
    }, style),
    onClick: onClick
  }, React.createElement(Icon, {
    size: 24,
    path: path,
    color: fg
  }), React.createElement("div", {
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
  return React.createElement("form", {
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
  return isemail.validate(email);
}

var InputBase = function InputBase(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      type = _ref.type,
      display = _ref.display,
      label = _ref.label,
      required = _ref.required,
      color = _ref.color,
      errorColor = _ref.errorColor,
      disabled = _ref.disabled,
      spellcheck = _ref.spellcheck,
      validate = _ref.validate,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      children = _ref.children;

  var _useState = useState(false),
      focus = _useState[0],
      setFocus = _useState[1];

  var _useState2 = useState(false),
      touched = _useState2[0],
      setTouched = _useState2[1];

  var error = touched ? validate(display) : null;
  var hasValue = display !== undefined && display !== null && display !== '';

  var _onChange = useCallback(function (e) {
    return onChange(e.target.value);
  }, [onChange]);

  var _onFocus = useCallback(function () {
    if (onFocus) {
      onFocus();
    }

    setFocus(true);
  }, [onFocus]);

  var _onBlur = useCallback(function () {
    if (onBlur) {
      onBlur();
    }

    setFocus(false);
    setTouched(true);
  }, [onBlur]);

  var highlight = useMemo(function () {
    if (disabled) {
      return undefined;
    }

    if (error) {
      return errorColor;
    }

    if (focus) {
      return color;
    }

    return undefined;
  }, [disabled, error, focus, color, errorColor]);
  return React.createElement("div", {
    className: "ui-input__container"
  }, label && React.createElement("p", {
    style: {
      color: highlight
    },
    className: merge("ui-input__label", {
      'ui-input__label--float': focus || hasValue
    })
  }, label, required && '*'), React.createElement("div", {
    id: id,
    className: merge('ui-input', {
      'ui-input--disabled': disabled
    }, className),
    style: _extends({
      border: highlight ? "1px solid " + highlight : undefined
    }, style)
  }, React.createElement("input", {
    className: "ui-input__display",
    type: type === 'password' ? 'password' : 'text',
    value: display,
    spellCheck: spellcheck,
    onChange: _onChange,
    onFocus: _onFocus,
    onBlur: _onBlur
  }), children), error && !disabled && React.createElement("p", {
    style: {
      color: errorColor
    },
    className: "ui-input__error-text"
  }, error.message));
};

var InputEmail = function InputEmail(_ref) {
  var value = _ref.value,
      required = _ref.required,
      props = _objectWithoutPropertiesLoose(_ref, ["value", "required"]);

  var validate = useCallback(function (value) {
    if (required && value === '') {
      return error('@ui/input-required', 'Required');
    } else if (!isEmail(value)) {
      return error('@ui/input-email-invalid', 'Email invalid');
    } else {
      return null;
    }
  }, [required]);
  return React.createElement(InputBase, Object.assign({
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

  var validate = useCallback(function (value) {
    if (required && value === '') {
      return error('@ui/input-required', 'Required');
    } else {
      return null;
    }
  }, [required]);
  return React.createElement(InputBase, Object.assign({
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

  var validate = useCallback(function (value) {
    if (required && value === '') {
      return error('@ui/input-required', 'Required');
    } else {
      return null;
    }
  }, [required]);
  return React.createElement(InputBase, Object.assign({
    display: value,
    required: required,
    spellcheck: false,
    validate: validate
  }, props));
};

var InputNumber = function InputNumber(_ref) {
  var value = _ref.value,
      required = _ref.required,
      step = _ref.step,
      precision = _ref.precision,
      units = _ref.units,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      props = _objectWithoutPropertiesLoose(_ref, ["value", "required", "step", "precision", "units", "onChange", "onBlur"]);

  var toValue = useCallback(function (value) {
    return parseFloat(value);
  }, []);
  var toPrecision = useCallback(function (value) {
    return new Big(value).toFixed(precision);
  }, [precision]);

  var _useState = useState(toPrecision(value)),
      display = _useState[0],
      setDisplay = _useState[1];

  useEffect(function () {
    return setDisplay(toPrecision(value));
  }, [value, toPrecision]);
  var validate = useCallback(function (display) {
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

  var _onBlur = useCallback(function () {
    try {
      var val = toPrecision(display); // force precision and force valid numbers

      var parsed = toValue(val);
      setDisplay(val);
      onChange(parsed);
    } catch (e) {
      setDisplay(toPrecision(value));
    }

    if (onBlur) {
      onBlur();
    }
  }, [onBlur, toPrecision, toValue, display, value]);

  var onIncrease = useCallback(function () {
    var val = new Big(value).plus(step).toFixed(precision);
    var parsed = parseFloat(val);
    setDisplay(val);
    onChange(parsed);
  }, [step, value, display, error, precision, onChange]);
  var onDecrease = useCallback(function () {
    var val = new Big(value).minus(step).toFixed(precision);
    var parsed = parseFloat(val);
    setDisplay(val);
    onChange(parsed);
  }, [step, value, display, error, precision, onChange]);
  return React.createElement(InputBase, Object.assign({
    display: display,
    required: required,
    spellcheck: false,
    validate: validate,
    onBlur: _onBlur,
    onChange: setDisplay
  }, props), units && React.createElement("p", {
    className: "ui-input-number__units"
  }, units), React.createElement("div", {
    className: "ui-input-number__controls"
  }, React.createElement(Icon, {
    path: mdiChevronUp,
    size: 18,
    color: "#000000",
    onClick: onIncrease
  }), React.createElement(Icon, {
    path: mdiChevronDown,
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
      return React.createElement(InputEmail, Object.assign({}, props));

    case 'password':
      return React.createElement(InputPassword, Object.assign({}, props));

    case 'number':
      return React.createElement(InputNumber, Object.assign({}, props));

    case 'text':
    default:
      return React.createElement(InputText, Object.assign({}, props));
  }
};

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
  return React.createElement("div", {
    id: id,
    className: merge("ui-list-item", {
      'ui-list-item--hover': !!onClick,
      'ui-list-item--disabled': disabled
    }, className),
    style: style,
    onClick: onClick
  }, children);
};

/**
 * Option to be used with Select element.
 */

var Option = function Option(_ref) {
  var children = _ref.children;
  return React.createElement(Fragment, null, children);
};

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
  return React.createElement("div", {
    id: id,
    className: merge('ui-progress', {
      'ui-progress--indeterminate': percent === undefined,
      'ui-progress--hidden': hidden
    }, className),
    style: _extends({
      backgroundColor: bg
    }, style)
  }, React.createElement("div", {
    className: "ui-progress__indicator",
    style: {
      width: percent + "%",
      backgroundColor: color
    }
  }));
};

/**
 * Section component.
 */

var Section = function Section(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      width = _ref.width,
      children = _ref.children;
  return React.createElement("section", {
    id: id,
    className: merge('ui-section__container', className),
    style: style
  }, React.createElement("div", {
    className: "ui-section__content",
    style: {
      maxWidth: width
    }
  }, children));
};

/**
 * Select component to be used with the Option component.
 */

var Select = function Select(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      value = _ref.value,
      children = _ref.children,
      label = _ref.label,
      onChange = _ref.onChange,
      color = _ref.color,
      disabled = _ref.disabled;

  var _useState = useState(false),
      focus = _useState[0],
      setFocus = _useState[1];

  var element = useRef(null);
  var display = useMemo(function () {
    var _display = '';
    React.Children.forEach(children, function (child) {
      if (child.props.value === value) {
        _display = child.props.displayAs;
      }
    });
    return _display;
  }, [value, children]); // auto close

  useEffect(function () {
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
  return React.createElement("div", {
    id: id,
    className: merge('ui-select', {
      'ui-select--disabled': disabled
    }, className),
    style: style,
    ref: element
  }, label && React.createElement("p", {
    style: {
      color: focus ? color : undefined
    },
    className: "ui-input__label ui-input__label--float"
  }, label, "*"), React.createElement("div", {
    style: {
      borderColor: focus ? color : undefined
    },
    className: "ui-select__input"
  }, React.createElement("p", {
    className: "ui-select__display"
  }, display), React.createElement(Icon, {
    style: {
      transform: focus ? 'rotateZ(180deg)' : undefined
    },
    size: 24,
    color: "#777777",
    path: mdiChevronDown
  })), focus && React.createElement(Card, {
    className: "ui-select__card"
  }, React.Children.map(children, function (child) {
    return React.createElement("div", {
      key: child.props.value,
      className: "ui-select__item",
      onClick: function onClick() {
        onChange(child.props.value);
      }
    }, child);
  })));
};

/**
 * Google tasks style subheader component. Small, bold and capitalized.
 */

var Subheader = function Subheader(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children;
  return React.createElement("p", {
    id: id,
    className: merge("ui-subheader", className),
    style: style
  }, children);
};

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
  return React.createElement("div", {
    id: id,
    className: merge('ui-switch', {
      'ui-switch--active': value,
      'ui-switch--disabled': disabled
    }, className),
    style: style,
    onClick: function onClick() {
      return onChange && onChange(!value);
    }
  }, React.createElement("div", {
    className: "ui-switch__track",
    style: {
      backgroundColor: value ? bg : undefined
    }
  }), React.createElement("div", {
    className: "ui-switch__button",
    style: {
      backgroundColor: value ? color : undefined,
      left: value ? 19 : undefined
    }
  }));
};

/**
 * Tab component to be used inside the Tabs component;
 */

var Tab = function Tab(_ref) {
  var children = _ref.children;
  return React.createElement(Fragment, null, children);
};

/**
 * Tab component to be used inside the Tabs component;
 */

var Tab$1 = function Tab(_ref) {
  var children = _ref.children,
      value = _ref.value,
      selected = _ref.selected,
      background = _ref.background,
      highlight = _ref.highlight,
      onChange = _ref.onChange,
      setBar = _ref.setBar;
  var ref = useRef(null);
  var text = useForeground(selected ? highlight || '#000000' : background || '#ffffff');

  var _onClick = useCallback(function () {
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);

  useEffect(function () {
    if (setBar && selected && ref.current) {
      setBar({
        left: ref.current.offsetLeft,
        width: ref.current.offsetWidth
      });
    }
  }, [selected, setBar]);
  return React.createElement("div", {
    ref: ref,
    className: "ui-tab",
    style: {
      color: text,
      transition: selected ? 'color .2s .1s' : 'color .2s'
    },
    onClick: _onClick
  }, children);
};

/**
 * Tabs component used with the Tab ccomponent.
 */

var Tabs = function Tabs(_ref) {
  var children = _ref.children,
      value = _ref.value,
      onChange = _ref.onChange,
      background = _ref.background,
      highlight = _ref.highlight,
      className = _ref.className;

  var _useState = useState({
    left: 0,
    width: 90
  }),
      bar = _useState[0],
      setBar = _useState[1];

  return React.createElement("div", {
    className: merge("ui-tabs", className),
    style: {
      backgroundColor: background
    }
  }, Children.map(children, function (child) {
    return React.createElement(Tab$1, {
      value: child.props.value,
      selected: value === child.props.value,
      background: background,
      highlight: highlight,
      onChange: onChange,
      setBar: setBar
    }, child);
  }), React.createElement("div", {
    className: "ui-tabs__bar",
    style: _extends({
      backgroundColor: highlight
    }, bar)
  }));
};

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
      errorColor = _ref.errorColor,
      disabled = _ref.disabled,
      spellcheck = _ref.spellcheck,
      _onChange = _ref.onChange;
  var validate = useCallback(function (value) {
    if (required && value === '') {
      return 'Required';
    } else {
      return null;
    }
  }, [required]);

  var _useState = useState(false),
      focus = _useState[0],
      setFocus = _useState[1];

  var _useState2 = useState(false),
      touched = _useState2[0],
      setTouched = _useState2[1];

  var error = touched ? validate(value) : null;
  var hasValue = value !== undefined && value !== null && value !== '';
  var highlight = useMemo(function () {
    if (error) {
      return errorColor;
    }

    if (focus) {
      return color;
    }

    return undefined;
  }, [error, focus, color, errorColor]);
  return React.createElement("div", {
    className: "ui-input__container"
  }, label && React.createElement("p", {
    style: {
      color: highlight
    },
    className: merge("ui-input__label", {
      'ui-input__label--float': focus || hasValue
    })
  }, label, required && '*'), React.createElement("div", {
    id: id,
    className: merge('ui-input', {
      'ui-input--disabled': disabled
    }, className),
    style: _extends({
      border: highlight ? "1px solid " + highlight : undefined
    }, style)
  }, React.createElement("textarea", {
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
  }), React.createElement("div", {
    className: "ui-input__display ui-textarea__slave"
  }, value, '\n'), error && React.createElement(Icon, {
    className: "ui-input__error-icon",
    style: {
      marginRight: 8
    },
    path: mdiAlertBox,
    color: errorColor,
    size: 24
  })), error && React.createElement("p", {
    style: {
      color: errorColor
    },
    className: "ui-input__error-text"
  }, error));
};

/**
 * Internal component used by the Toast component.
 */

var ToastEntry = function ToastEntry(_ref) {
  var color = _ref.color,
      toast = _ref.toast,
      onDestroy = _ref.onDestroy;

  var _useState = useState(false),
      hidden = _useState[0],
      setHidden = _useState[1];

  var _useState2 = useState(),
      selfCombustTimeout = _useState2[0],
      setSelfCombustTimeout = _useState2[1];

  useEffect(function () {
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
  var onClick = useCallback(function () {
    clearTimeout(selfCombustTimeout);

    if (toast.onClick) {
      toast.onClick();
    }

    setHidden(true);
    setTimeout(function () {
      return onDestroy(toast.key);
    }, 500);
  }, [toast, selfCombustTimeout, onDestroy]);
  return React.createElement("div", {
    key: toast.key,
    className: merge('ui-toast', {
      'ui-toast--hide': hidden
    })
  }, React.createElement("span", {
    className: "ui-toast__text"
  }, toast.text), toast.onClick && React.createElement(Button, {
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
  return React.createElement(Fragment, null, toasts.map(function (toast) {
    return React.createElement(ToastEntry, {
      key: toast.key,
      color: color,
      toast: toast,
      onDestroy: onDestroy
    });
  }));
};

/**
 * Basic animation in for elements.
 */

var Transition = function Transition(_ref) {
  var id = _ref.id,
      className = _ref.className,
      style = _ref.style,
      type = _ref.type,
      children = _ref.children;
  return React.createElement("div", {
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

  useEffect(function () {
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

var MarkdownContent = function MarkdownContent(_ref) {
  var className = _ref.className,
      markdown = _ref.markdown,
      theme = _ref.theme;
  var faded = useAlpha(theme, .1);
  useStyles(".markdown-content blockquote { border-left: 4px solid " + theme + "; background-color: " + faded + "; }");
  useStyles(".markdown-content a { color: " + theme + "; }");
  useStyles(".markdown-content blockquote > p { color: " + theme + "; }");
  var html = useMemo(function () {
    var converter = new Converter({
      extensions: [showdownHighlight],
      openLinksInNewWindow: true
    });
    return {
      __html: converter.makeHtml(markdown)
    };
  }, [markdown]);
  return React.createElement("div", {
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
  var _useState = useState(null),
      win = _useState[0],
      setWin = _useState[1]; // init


  useEffect(function () {
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

  useEffect(function () {
    if (win) {
      win.document.body.innerHTML = parse(win, rootName, obj, '');
    }
  }, [win, obj, rootName]);
}

/**
 * Super simple pluralizer convenience method.
 */

function usePluralize(num, single, plural) {
  return useMemo(function () {
    return num === 1 ? single : plural;
  }, [num, single, plural]);
}

/**
 * Hook: Generates a array of colors of length 'count'. Minimum number of colors is 7.
 */

function useRainbow(count) {
  return useMemo(function () {
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
  var _useState = useState(0.0),
      y = _useState[0],
      setY = _useState[1];

  useEffect(function () {
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
  useEffect(function () {
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
  var _useState = useState(window.innerWidth),
      width = _useState[0],
      setWidth = _useState[1];

  var _useState2 = useState(window.innerHeight),
      height = _useState2[0],
      setHeight = _useState2[1];

  useEffect(function () {
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

export { Appbar, Avatar, Backdrop, BottomSheet, Button, Card, Checkbox, Content, Dialog, Divider, Drawer, DropFiles, Fab, Form, Icon, Input, ListItem, MarkdownContent, Option, Portal, Progress, Section, Select, Spinner, Subheader, Switch, Tab, Tabs, Textarea, Toast, Transition, chooseFiles, error, fileAccepted, isEmail, merge, useAlpha, useDelayBoolean, useForeground, useLog, usePluralize, useRainbow, useScrollListener, useStyles, useTheme, useWindowResizeListener, wait };
//# sourceMappingURL=solo-ui.esm.js.map
