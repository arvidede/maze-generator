// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/js/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CELLS = exports.CELL_WIDTH = void 0;
var CELL_WIDTH = 30;
exports.CELL_WIDTH = CELL_WIDTH;
var CELLS = Math.floor((window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth) / CELL_WIDTH) - 2;
exports.CELLS = CELLS;
},{}],"assets/js/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = void 0;

var _constants = require("./constants.js");

var index = function index(col, row) {
  if (col < 0 || row < 0 || col > _constants.CELLS - 1 || row > _constants.CELLS - 1) return -1;
  return col + row * _constants.CELLS;
};

exports.index = index;
},{"./constants.js":"assets/js/constants.js"}],"assets/js/Cell.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("./helpers.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cell =
/*#__PURE__*/
function () {
  function Cell(col, row, width, p) {
    _classCallCheck(this, Cell);

    this.col = col;
    this.row = row;
    this.width = width;
    this.x = col * width;
    this.y = row * width;
    this.p = p;
    this.walls = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    this.visited = false;
  }

  _createClass(Cell, [{
    key: "show",
    value: function show() {
      var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.p.stroke(255);

      if (this.walls.up) {
        this.p.line(this.x, this.y, this.x + this.width, this.y);
      }

      if (this.walls.down) {
        this.p.line(this.x, this.y + this.width, this.x + this.width, this.y + this.width);
      }

      if (this.walls.left) {
        this.p.line(this.x, this.y, this.x, this.y + this.width);
      }

      if (this.walls.right) {
        this.p.line(this.x + this.width, this.y, this.x + this.width, this.y + this.width);
      }

      if (this.visited) {
        this.p.noStroke();
        this.p.fill(this.p.color(color ? color : 50, 75));
        this.p.rect(this.x, this.y, this.width, this.width);
      }
    }
  }, {
    key: "getOppositeDirection",
    value: function getOppositeDirection(direction) {
      switch (direction) {
        case 'up':
          return 'down';

        case 'down':
          return 'up';

        case 'left':
          return 'right';

        case 'right':
          return 'left';
      }
    }
  }, {
    key: "removeWall",
    value: function removeWall(direction) {
      var neighbor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.walls[direction] = false;
      if (neighbor) neighbor.removeWall(this.getOppositeDirection(direction));
    }
  }, {
    key: "getNeighbor",
    value: function getNeighbor(grid) {
      var neighbors = {
        up: grid[(0, _helpers.index)(this.col, this.row - 1)],
        down: grid[(0, _helpers.index)(this.col, this.row + 1)],
        left: grid[(0, _helpers.index)(this.col - 1, this.row)],
        right: grid[(0, _helpers.index)(this.col + 1, this.row)]
      };
      var unvisitedNeighbors = Object.keys(neighbors).map(function (n) {
        return neighbors[n] && !neighbors[n].visited ? n : null;
      }).filter(function (e) {
        return e;
      });

      if (unvisitedNeighbors.length > 0) {
        var direction = unvisitedNeighbors[Math.floor(unvisitedNeighbors.length * Math.random())];
        var neighbor = neighbors[direction];
        this.removeWall(direction, neighbor);
        return neighbor;
      }

      return null;
    }
  }]);

  return Cell;
}();

exports.default = Cell;
},{"./helpers.js":"assets/js/helpers.js"}],"assets/js/sketch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Cell = _interopRequireDefault(require("./Cell.js"));

var _constants = require("./constants.js");

var _helpers = require("./helpers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sketch = function Sketch(p) {
  var grid = [];
  var stack = [];
  var currentCell;
  var nextCell;

  p.setup = function () {
    p.createCanvas(_constants.CELLS * _constants.CELL_WIDTH + 2, _constants.CELLS * _constants.CELL_WIDTH + 2);

    for (var row = 0; row < _constants.CELLS; row++) {
      for (var col = 0; col < _constants.CELLS; col++) {
        grid.push(new _Cell.default(col, row, _constants.CELL_WIDTH, p));
      }
    }

    currentCell = grid[Math.round(grid.length * Math.random())];
    currentCell.visited = true;
    p.background(0);
    p.frameRate(500);
  };

  p.draw = function () {
    for (var _i = 0, _grid = grid; _i < _grid.length; _i++) {
      var cell = _grid[_i];
      cell.show();
    } // Depth-first: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker


    currentCell.visited = true;
    currentCell.show(100);
    nextCell = currentCell.getNeighbor(grid);

    if (nextCell) {
      stack.push(currentCell);
      currentCell = nextCell;
    } else if (stack.length > 0) {
      currentCell = stack.pop();
    } else {
      p.noLoop();
    }

    p.stroke(255);
    p.noFill();
    p.rect(0, 0, _constants.CELLS * _constants.CELL_WIDTH, _constants.CELLS * _constants.CELL_WIDTH);
  };
};

var _default = Sketch;
exports.default = _default;
},{"./Cell.js":"assets/js/Cell.js","./constants.js":"assets/js/constants.js","./helpers.js":"assets/js/helpers.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _sketch = _interopRequireDefault(require("./assets/js/sketch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (module.hot) {
  module.hot.accept(function () {
    window.location.reload();
  });
}

new p5(_sketch.default);
},{"./assets/js/sketch":"assets/js/sketch.js"}],"../../../.nvm/versions/node/v12.3.1/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51804" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.nvm/versions/node/v12.3.1/lib/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/maze-generator.e31bb0bc.js.map