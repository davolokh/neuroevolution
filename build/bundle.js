/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Network = undefined;

var _Layer = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  /**
      * Logistic activation function.
      *
  * @param {a} Input value.
  * @return Logistic function output.
  */
  activation: function activation(a) {
    var ap = -a / 1;
    return 1 / (1 + Math.exp(ap));
  },


  /**
   * Returns a random value between -1 and 1.
   *
   * @return Random value.
   */
  randomClamped: function randomClamped() {
    return Math.random() * 2 - 1;
  },


  // various factors and parameters (along with default values).
  network: [2, [2], 1], // Perceptron network structure (1 hidden
  // layer).
  population: 50, // Population by generation.
  elitism: 0.2, // Best networks kepts unchanged for the next
  // generation (rate).
  randomBehaviour: 0.2, // New random networks for the next generation
  // (rate).
  mutationRate: 0.1, // Mutation rate on the weights of synapses.
  mutationRange: 0.5, // Interval of the mutation changes on the
  // synapse weight.
  historic: 0, // Latest generations saved.
  lowHistoric: false, // Only save score (not the network).
  scoreSort: -1, // Sort order (-1 = desc, 1 = asc).
  nbChild: 1 // Number of children by breeding.
};

var Network =
/**
 * Neural Network class
 *
 * Composed of Neuron Layers.
 *
 * @constructor
 */
function Network() {
  var _this = this;

  _classCallCheck(this, Network);

  this.perceptronGeneration = function (input, hiddens, output) {
    var index = 0;
    var previousNeurons = 0;
    var inputLayer = new _Layer.Layer(index);
    inputLayer.populate(input, previousNeurons); // Number of Inputs will be set to
    // 0 since it is an input layer.
    previousNeurons = input; // number of input is size of previous layer.
    _this.layers.push(inputLayer);
    index++;
    for (var i in hiddens) {
      // Repeat same process as first layer for each hidden layer.
      var hiddenLayer = new _Layer.Layer(index);
      hiddenLayer.populate(hiddens[i], previousNeurons);
      previousNeurons = hiddens[i];
      _this.layers.push(hiddenLayer);
      index++;
    }
    var outputLayer = new _Layer.Layer(index);
    outputLayer.populate(output, previousNeurons); // Number of input is equal to
    // the size of the last hidden
    // layer.
    _this.layers.push(outputLayer);
  };

  this.getSave = function () {
    var datas = {
      neurons: [], // Number of Neurons per layer.
      weights: [] // Weights of each Neuron's inputs.
    };

    for (var i in _this.layers) {
      datas.neurons.push(_this.layers[i].neurons.length);
      for (var j in _this.layers[i].neurons) {
        for (var k in _this.layers[i].neurons[j].weights) {
          // push all input weights of each Neuron of each Layer into a flat
          // array.
          datas.weights.push(_this.layers[i].neurons[j].weights[k]);
        }
      }
    }
    return datas;
  };

  this.setSave = function (save) {
    var previousNeurons = 0;
    var index = 0;
    var indexWeights = 0;
    _this.layers = [];
    for (var i in save.neurons) {
      // Create and populate layers.
      var layer = new _Layer.Layer(index);
      layer.populate(save.neurons[i], previousNeurons);
      for (var j in layer.neurons) {
        for (var k in layer.neurons[j].weights) {
          // Apply neurons weights to each Neuron.
          layer.neurons[j].weights[k] = save.weights[indexWeights];

          indexWeights++; // Increment index of flat array.
        }
      }
      previousNeurons = save.neurons[i];
      index++;
      _this.layers.push(layer);
    }
  };

  this.compute = function (inputs) {
    // Set the value of each Neuron in the input layer.
    for (var i in inputs) {
      if (_this.layers[0] && _this.layers[0].neurons[i]) {
        _this.layers[0].neurons[i].value = inputs[i];
      }
    }

    var prevLayer = _this.layers[0]; // Previous layer is input layer.
    for (var _i = 1; _i < _this.layers.length; _i++) {
      for (var j in _this.layers[_i].neurons) {
        // For each Neuron in each layer.
        var sum = 0;
        for (var k in prevLayer.neurons) {
          // Every Neuron in the previous layer is an input to each Neuron in
          // the next layer.
          sum += prevLayer.neurons[k].value * _this.layers[_i].neurons[j].weights[k];
        }

        // Compute the activation of the Neuron.
        _this.layers[_i].neurons[j].value = _this.options.activation(sum);
      }
      prevLayer = _this.layers[_i];
    }

    // All outputs of the Network.
    var out = [];
    var lastLayer = _this.layers[_this.layers.length - 1];
    for (var _i2 in lastLayer.neurons) {
      out.push(lastLayer.neurons[_i2].value);
    }
    return out;
  };

  this.layers = [];
  this.options = defaultOptions;
}

/**
 * Generate the Network layers.
 *
 * @param {input} Number of Neurons in Input layer.
 * @param {hidden} Number of Neurons per Hidden layer.
 * @param {output} Number of Neurons in Output layer.
 * @return void
 */


/**
 * Create a copy of the Network (neurons and weights).
 *
 * Returns number of neurons per layer and a flat array of all weights.
 *
 * @return Network data.
 */


/**
 * Apply network data (neurons and weights).
 *
 * @param {save} Copy of network data (neurons and weights).
 * @return void
 */


/**
 * Compute the output of an input.
 *
 * @param {inputs} Set of inputs.
 * @return Network output.
 */
;

exports.Network = Network;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(2);

var loadImages = function loadImages(sources, callback) {
  var nb = 0;
  var loaded = 0;
  var imgs = {};
  for (var i in sources) {
    nb++;
    imgs[i] = new Image();
    imgs[i].src = sources[i];
    imgs[i].onload = function () {
      // eslint-disable-line
      loaded++;
      if (loaded === nb) {
        callback(imgs);
      }
    };
  }
};

window.onload = function () {
  var sprites = {
    bird: './img/bird.png',
    background: './img/background.png',
    pipetop: './img/pipetop.png',
    pipebottom: './img/pipebottom.png'
  };

  var start = function start(imgs) {
    var game = new _Game.Game(imgs);
    game.start();
    game.update();
    game.display();
  };

  loadImages(sprites, function (imgs) {
    return start(imgs);
  });
};

var timeouts = [];
var messageName = 'zero-timeout-message';

function setZeroTimeout(fn) {
  timeouts.push(fn);
  window.postMessage(messageName, '*');
}

function handleMessage(event) {
  if (event.source === window && event.data === messageName) {
    event.stopPropagation();
    if (timeouts.length > 0) {
      var fn = timeouts.shift();
      fn();
    }
  }
}

window.addEventListener('message', handleMessage, true);

window.setZeroTimeout = setZeroTimeout;

window.FPS = 60;
window.speed = function (fps) {
  window.FPS = parseInt(fps, 10);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = undefined;

var _Bird = __webpack_require__(3);

var _Pipe = __webpack_require__(4);

var _Neuroevolution = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Neuvol = new _Neuroevolution.Neuroevolution({
  population: 50,
  network: [2, [2], 1]
});

var Game = function Game(images) {
  var _this = this;

  _classCallCheck(this, Game);

  this.start = function () {
    _this.interval = 0;
    _this.score = 0;
    _this.pipes = [];
    _this.birds = [];

    _this.gen = Neuvol.nextGeneration();
    console.log(_this.gen);
    for (var i in _this.gen) {
      // eslint-disable-line
      var b = new _Bird.Bird();
      _this.birds.push(b);
    }
    _this.generation++;
    _this.alives = _this.birds.length;
  };

  this.update = function () {
    _this.backgroundx += _this.backgroundSpeed;
    var nextHoll = 0;
    if (_this.birds.length > 0) {
      for (var i = 0; i < _this.pipes.length; i += 2) {
        if (_this.pipes[i].x + _this.pipes[i].width > _this.birds[0].x) {
          nextHoll = _this.pipes[i].height / _this.height;
          break;
        }
      }
    }

    for (var _i in _this.birds) {
      if (_this.birds[_i].alive) {
        var inputs = [_this.birds[_i].y / _this.height, nextHoll];

        var res = _this.gen[_i].compute(inputs);
        if (res > 0.5) {
          _this.birds[_i].flap();
        }

        _this.birds[_i].update();
        if (_this.birds[_i].isDead(_this.height, _this.pipes)) {
          _this.birds[_i].alive = false;
          _this.alives--;
          // console.log(this.alives);
          Neuvol.networkScore(_this.gen[_i], _this.score);
          if (_this.isItEnd()) {
            _this.start();
          }
        }
      }
    }

    for (var _i2 = 0; _i2 < _this.pipes.length; _i2++) {
      _this.pipes[_i2].update();
      if (_this.pipes[_i2].isOut()) {
        _this.pipes.splice(_i2, 1);
        _i2--;
      }
    }

    if (_this.interval === 0) {
      var deltaBord = 50;
      var pipeHoll = 120;
      var hollPosition = Math.round(Math.random() * (_this.height - deltaBord * 2 - pipeHoll)) + deltaBord;
      _this.pipes.push(new _Pipe.Pipe({ x: _this.width, y: 0, height: hollPosition }));
      _this.pipes.push(new _Pipe.Pipe({ x: _this.width, y: hollPosition + pipeHoll, height: _this.height }));
    }

    _this.interval++;
    if (_this.interval === _this.spawnInterval) {
      _this.interval = 0;
    }

    _this.score++;
    _this.maxScore = _this.score > _this.maxScore ? _this.score : _this.maxScore;

    if (window.FPS === 0) {
      window.setZeroTimeout(function () {
        _this.update();
      });
    } else {
      setTimeout(function () {
        _this.update();
      }, 1000 / window.FPS);
    }
  };

  this.isItEnd = function () {
    for (var i in _this.birds) {
      if (_this.birds[i].alive) {
        return false;
      }
    }
    return true;
  };

  this.display = function () {
    _this.ctx.clearRect(0, 0, _this.width, _this.height);
    for (var i = 0; i < Math.ceil(_this.width / _this.images.background.width) + 1; i++) {
      _this.ctx.drawImage(_this.images.background, i * _this.images.background.width - Math.floor(_this.backgroundx % _this.images.background.width), 0);
    }

    for (var _i3 in _this.pipes) {
      if (_i3 % 2 === 0) {
        _this.ctx.drawImage(_this.images.pipetop, _this.pipes[_i3].x, _this.pipes[_i3].y + _this.pipes[_i3].height - _this.images.pipetop.height, _this.pipes[_i3].width, _this.images.pipetop.height);
      } else {
        _this.ctx.drawImage(_this.images.pipebottom, _this.pipes[_i3].x, _this.pipes[_i3].y, _this.pipes[_i3].width, _this.images.pipetop.height);
      }
    }

    _this.ctx.fillStyle = '#FFC600';
    _this.ctx.strokeStyle = '#CE9E00';
    for (var _i4 in _this.birds) {
      if (_this.birds[_i4].alive) {
        _this.ctx.save();
        _this.ctx.translate(_this.birds[_i4].x + _this.birds[_i4].width / 2, _this.birds[_i4].y + _this.birds[_i4].height / 2);
        _this.ctx.rotate(Math.PI / 2 * _this.birds[_i4].gravity / 20);
        _this.ctx.drawImage(_this.images.bird, -_this.birds[_i4].width / 2, -_this.birds[_i4].height / 2, _this.birds[_i4].width, _this.birds[_i4].height);
        _this.ctx.restore();
      }
    }

    _this.ctx.fillStyle = 'white';
    _this.ctx.font = '20px Oswald, sans-serif';
    _this.ctx.fillText('Score : ' + _this.score, 10, 25);
    _this.ctx.fillText('Max Score : ' + _this.maxScore, 10, 50);
    _this.ctx.fillText('Generation : ' + _this.generation, 10, 75);
    _this.ctx.fillText('Alive : ' + _this.alives + ' / ' + Neuvol.options.population, 10, 100);

    requestAnimationFrame(function () {
      _this.display();
    });
  };

  this.pipes = [];
  this.birds = [];
  this.score = 0;
  this.canvas = document.querySelector('#flappy');
  this.ctx = this.canvas.getContext('2d');
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this.spawnInterval = 90;
  this.interval = 0;
  this.gen = [];
  this.alives = 0;
  this.generation = 0;
  this.backgroundSpeed = 0.5;
  this.backgroundx = 0;
  this.maxScore = 0;

  this.images = images;
};

exports.Game = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bird = function Bird(json) {
  _classCallCheck(this, Bird);

  _initialiseProps.call(this);

  this.x = 80;
  this.y = 250;
  this.width = 40;
  this.height = 30;

  this.alive = true;
  this.gravity = 0;
  this.velocity = 0.3;
  this.jump = -6;

  this.init(json);
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.init = function (json) {
    for (var i in json) {
      _this[i] = json[i];
    }
  };

  this.flap = function () {
    _this.gravity = _this.jump;
  };

  this.update = function () {
    _this.gravity += _this.velocity;
    _this.y += _this.gravity;
  };

  this.isDead = function (height, pipes) {
    if (_this.y >= height || _this.y + _this.height <= 0) {
      return true;
    }
    for (var i in pipes) {
      if (!(_this.x > pipes[i].x + pipes[i].width || _this.x + _this.width < pipes[i].x || _this.y > pipes[i].y + pipes[i].height || _this.y + _this.height < pipes[i].y)) {
        return true;
      }
    }
  };
};

exports.Bird = Bird;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pipe = function () {
  function Pipe(json) {
    _classCallCheck(this, Pipe);

    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 40;
    this.speed = 3;

    this.init(json);
  }

  _createClass(Pipe, [{
    key: "init",
    value: function init(json) {
      for (var i in json) {
        this[i] = json[i];
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.x -= this.speed;
    }
  }, {
    key: "isOut",
    value: function isOut() {
      if (this.x + this.width < 0) {
        return true;
      }
    }
  }]);

  return Pipe;
}();

exports.Pipe = Pipe;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Neuroevolution = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Generations = __webpack_require__(6);

var _Network = __webpack_require__(0);

var _Genome = __webpack_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  /**
      * Logistic activation function.
      *
  * @param {a} Input value.
  * @return Logistic function output.
  */
  activation: function activation(a) {
    var ap = -a / 1;
    return 1 / (1 + Math.exp(ap));
  },


  /**
   * Returns a random value between -1 and 1.
   *
   * @return Random value.
   */
  randomClamped: function randomClamped() {
    return Math.random() * 2 - 1;
  },


  // various factors and parameters (along with default values).
  network: [2, [2], 1], // Perceptron network structure (1 hidden
  // layer).
  population: 50, // Population by generation.
  elitism: 0.2, // Best networks kepts unchanged for the next
  // generation (rate).
  randomBehaviour: 0.2, // New random networks for the next generation
  // (rate).
  mutationRate: 0.1, // Mutation rate on the weights of synapses.
  mutationRange: 0.5, // Interval of the mutation changes on the
  // synapse weight.
  historic: 0, // Latest generations saved.
  lowHistoric: false, // Only save score (not the network).
  scoreSort: -1, // Sort order (-1 = desc, 1 = asc).
  nbChild: 1 // Number of children by breeding.
};

/**
 * Provides a set of classes and methods for handling Neuroevolution and
 * genetic algorithms.
 *
 * @param {options} An object of options for Neuroevolution.
 */

var Neuroevolution = function Neuroevolution(options) {
  var _this = this;

  _classCallCheck(this, Neuroevolution);

  this.restart = function () {
    _this.generations = new _Generations.Generations();
  };

  this.nextGeneration = function () {
    var networks = [];

    if (_this.generations.generations.length === 0) {
      // If no Generations, create first.
      networks = _this.generations.firstGeneration();
    } else {
      // Otherwise, create next one.
      networks = _this.generations.nextGeneration();
    }

    // Create Networks from the current Generation.
    var nns = [];
    for (var i in networks) {
      var nn = new _Network.Network();
      nn.setSave(networks[i]);
      nns.push(nn);
    }

    if (_this.options.lowHistoric) {
      // Remove old Networks.
      if (_this.generations.generations.length >= 2) {
        var genomes = _this.generations.generations[_this.generations.generations.length - 2].genomes;
        for (var _i in genomes) {
          delete genomes[_i].network;
        }
      }
    }

    if (_this.options.historic !== -1) {
      // Remove older generations.
      if (_this.generations.generations.length > _this.options.historic + 1) {
        _this.generations.generations.splice(0, _this.generations.generations.length - (_this.options.historic + 1));
      }
    }

    return nns;
  };

  this.networkScore = function (network, score) {
    _this.generations.addGenome(new _Genome.Genome(score, network.getSave()));
  };

  // Declaration of module parameters (options) and default values
  this.options = _extends({}, defaultOptions, { options: options });
  this.generations = new _Generations.Generations();
}

/**
 * Reset and create a new Generations object.
 *
 * @return void.
 */


/**
 * Create the next generation.
 *
 * @return Neural Network array for next Generation.
 */


/**
 * Adds a new Genome with specified Neural Network and score.
 *
 * @param {network} Neural Network.
 * @param {score} Score value.
 * @return void.
 */
;

exports.Neuroevolution = Neuroevolution;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Generations = undefined;

var _Generation = __webpack_require__(7);

var _Network = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  /**
      * Logistic activation function.
      *
  * @param {a} Input value.
  * @return Logistic function output.
  */
  activation: function activation(a) {
    var ap = -a / 1;
    return 1 / (1 + Math.exp(ap));
  },


  /**
   * Returns a random value between -1 and 1.
   *
   * @return Random value.
   */
  randomClamped: function randomClamped() {
    return Math.random() * 2 - 1;
  },


  // various factors and parameters (along with default values).
  network: [2, [2], 1], // Perceptron network structure (1 hidden
  // layer).
  population: 50, // Population by generation.
  elitism: 0.2, // Best networks kepts unchanged for the next
  // generation (rate).
  randomBehaviour: 0.2, // New random networks for the next generation
  // (rate).
  mutationRate: 0.1, // Mutation rate on the weights of synapses.
  mutationRange: 0.5, // Interval of the mutation changes on the
  // synapse weight.
  historic: 0, // Latest generations saved.
  lowHistoric: false, // Only save score (not the network).
  scoreSort: -1, // Sort order (-1 = desc, 1 = asc).
  nbChild: 1 // Number of children by breeding.
};

var Generations =
/**
 * Generations class.
 *
 * Hold's previous Generations and current Generation.
 *
 * @constructor
 */
function Generations() {
  var _this = this;

  _classCallCheck(this, Generations);

  this.firstGeneration = function () {
    var out = [];
    for (var i = 0; i < _this.options.population; i++) {
      // Generate the Network and save it.
      var nn = new _Network.Network();
      nn.perceptronGeneration(_this.options.network[0], _this.options.network[1], _this.options.network[2]);
      out.push(nn.getSave());
    }

    _this.generations.push(new _Generation.Generation());
    return out;
  };

  this.nextGeneration = function () {
    if (_this.generations.length === 0) {
      // Need to create first generation.
      return false;
    }

    var gen = _this.generations[_this.generations.length - 1].generateNextGeneration();
    _this.generations.push(new _Generation.Generation());
    return gen;
  };

  this.addGenome = function (genome) {
    // Can't add to a Generation if there are no Generations.
    if (_this.generations.length === 0) return false;

    // FIXME addGenome returns void.
    return _this.generations[_this.generations.length - 1].addGenome(genome);
  };

  this.generations = [];
  this.options = defaultOptions;
  // var currentGeneration = new Generation();
}

/**
 * Create the first generation.
 *
 * @param {input} Input layer.
 * @param {input} Hidden layer(s).
 * @param {output} Output layer.
 * @return First Generation.
 */


/**
 * Create the next Generation.
 *
 * @return Next Generation.
 */


/**
 * Add a genome to the Generations.
 *
 * @param {genome}
 * @return False if no Generations to add to.
 */
;

exports.Generations = Generations;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  /**
      * Logistic activation function.
      *
  * @param {a} Input value.
  * @return Logistic function output.
  */
  activation: function activation(a) {
    var ap = -a / 1;
    return 1 / (1 + Math.exp(ap));
  },


  /**
   * Returns a random value between -1 and 1.
   *
   * @return Random value.
   */
  randomClamped: function randomClamped() {
    return Math.random() * 2 - 1;
  },


  // various factors and parameters (along with default values).
  network: [2, [2], 1], // Perceptron network structure (1 hidden
  // layer).
  population: 50, // Population by generation.
  elitism: 0.2, // Best networks kepts unchanged for the next
  // generation (rate).
  randomBehaviour: 0.2, // New random networks for the next generation
  // (rate).
  mutationRate: 0.1, // Mutation rate on the weights of synapses.
  mutationRange: 0.5, // Interval of the mutation changes on the
  // synapse weight.
  historic: 0, // Latest generations saved.
  lowHistoric: false, // Only save score (not the network).
  scoreSort: -1, // Sort order (-1 = desc, 1 = asc).
  nbChild: 1 // Number of children by breeding.
};

var Generation =
/**
 * Generation class.
 *
 * Composed of a set of Genomes.
 *
 * @constructor
 */
function Generation() {
  var _this = this;

  _classCallCheck(this, Generation);

  this.addGenome = function (genome) {
    // Locate position to insert Genome into.
    // The gnomes should remain sorted.
    var i = void 0;
    for (i = 0; i < _this.genomes.length; i++) {
      // Sort in descending order.
      if (_this.options.scoreSort < 0) {
        if (genome.score > _this.genomes[i].score) {
          break;
        }
        // Sort in ascending order.
      } else if (genome.score < _this.genomes[i].score) {
        break;
      }
    }

    // Insert genome into correct position.
    _this.genomes.splice(i, 0, genome);
  };

  this.breed = function (g1, g2, nbChilds) {
    var datas = [];
    for (var nb = 0; nb < nbChilds; nb++) {
      // Deep clone of genome 1.
      var data = JSON.parse(JSON.stringify(g1));
      for (var i in g2.network.weights) {
        // Genetic crossover
        // 0.5 is the crossover factor.
        // FIXME Really should be a predefined constant.
        if (Math.random() <= 0.5) {
          data.network.weights[i] = g2.network.weights[i];
        }
      }

      // Perform mutation on some weights.
      for (var _i in data.network.weights) {
        if (Math.random() <= _this.options.mutationRate) {
          data.network.weights[_i] += Math.random() * _this.options.mutationRange * 2 - _this.options.mutationRange;
        }
      }
      datas.push(data);
    }

    return datas;
  };

  this.generateNextGeneration = function () {
    var nexts = [];

    for (var i = 0; i < Math.round(_this.options.elitism * _this.options.population); i++) {
      if (nexts.length < _this.options.population) {
        // Push a deep copy of ith Genome's Nethwork.
        nexts.push(JSON.parse(JSON.stringify(_this.genomes[i].network)));
      }
    }

    for (var _i2 = 0; _i2 < Math.round(_this.options.randomBehaviour * _this.options.population); _i2++) {
      var n = JSON.parse(JSON.stringify(_this.genomes[0].network));
      for (var k in n.weights) {
        n.weights[k] = _this.options.randomClamped();
      }
      if (nexts.length < _this.options.population) {
        nexts.push(n);
      }
    }

    var max = 0;
    while (true) {
      // eslint-disable-line
      for (var _i3 = 0; _i3 < max; _i3++) {
        // Create the children and push them to the nexts array.
        var childs = _this.breed(_this.genomes[_i3], _this.genomes[max], _this.options.nbChild > 0 ? _this.options.nbChild : 1);
        for (var c in childs) {
          nexts.push(childs[c].network);
          if (nexts.length >= _this.options.population) {
            // Return once number of children is equal to the
            // population by generatino value.
            return nexts;
          }
        }
      }
      max++;
      if (max >= _this.genomes.length - 1) {
        max = 0;
      }
    }
  };

  this.genomes = [];
  this.options = defaultOptions;
}

/**
 * Add a genome to the generation.
 *
 * @param {genome} Genome to add.
 * @return void.
 */


/**
 * Breed to genomes to produce offspring(s).
 *
 * @param {g1} Genome 1.
 * @param {g2} Genome 2.
 * @param {nbChilds} Number of offspring (children).
 */


/**
 * Generate the next generation.
 *
 * @return Next generation data array.
 */
;

exports.Generation = Generation;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layer = undefined;

var _Neuron = __webpack_require__(9);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layer =
/**
 * Neural Network Layer class.
 *
 * @constructor
 * @param {index} Index of this Layer in the Network.
 */
function Layer(index) {
  var _this = this;

  _classCallCheck(this, Layer);

  this.populate = function (nbNeurons, nbInputs) {
    _this.neurons = [];
    for (var i = 0; i < nbNeurons; i++) {
      var n = new _Neuron.Neuron();
      n.populate(nbInputs);
      _this.neurons.push(n);
    }
  };

  this.id = index || 0;
  this.neurons = [];
}

/**
 * Populate the Layer with a set of randomly weighted Neurons.
 *
 * Each Neuron be initialied with nbInputs inputs with a random clamped
 * value.
 *
 * @param {nbNeurons} Number of neurons.
 * @param {nbInputs} Number of inputs.
 * @return void
 */
;

exports.Layer = Layer;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  /**
      * Logistic activation function.
      *
  * @param {a} Input value.
  * @return Logistic function output.
  */
  activation: function activation(a) {
    var ap = -a / 1;
    return 1 / (1 + Math.exp(ap));
  },


  /**
   * Returns a random value between -1 and 1.
   *
   * @return Random value.
   */
  randomClamped: function randomClamped() {
    return Math.random() * 2 - 1;
  },


  // various factors and parameters (along with default values).
  network: [2, [2], 1], // Perceptron network structure (1 hidden
  // layer).
  population: 50, // Population by generation.
  elitism: 0.2, // Best networks kepts unchanged for the next
  // generation (rate).
  randomBehaviour: 0.2, // New random networks for the next generation
  // (rate).
  mutationRate: 0.1, // Mutation rate on the weights of synapses.
  mutationRange: 0.5, // Interval of the mutation changes on the
  // synapse weight.
  historic: 0, // Latest generations saved.
  lowHistoric: false, // Only save score (not the network).
  scoreSort: -1, // Sort order (-1 = desc, 1 = asc).
  nbChild: 1 // Number of children by breeding.
};

var Neuron =
/**
 * Artificial Neuron class
 *
 * @constructor
 */
function Neuron() {
  var _this = this;

  _classCallCheck(this, Neuron);

  this.populate = function (nb) {
    _this.weights = [];
    for (var i = 0; i < nb; i++) {
      _this.weights.push(_this.options.randomClamped());
    }
  };

  this.value = 0;
  this.weights = [];
  this.options = defaultOptions;
}

/**
 * Initialize number of neuron weights to random clamped values.
 *
 * @param {nb} Number of neuron weights (number of inputs).
 * @return void
 */
;

exports.Neuron = Neuron;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Genome =
/**
 * Genome class.
 *
 * Composed of a score and a Neural Network.
 *
 * @constructor
 *
 * @param {score}
 * @param {network}
 */
function Genome() {
  var score = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  _classCallCheck(this, Genome);

  this.score = score;
  this.network = network;
};

exports.Genome = Genome;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map