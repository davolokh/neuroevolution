const defaultOptions = {
  /**
      * Logistic activation function.
      *
  * @param {a} Input value.
  * @return Logistic function output.
  */
  activation(a) {
    const ap = (-a) / 1;
    return (1 / (1 + Math.exp(ap)));
  },

  /**
   * Returns a random value between -1 and 1.
   *
   * @return Random value.
   */
  randomClamped() {
    return Math.random() * 2 - 1;
  },

  // various factors and parameters (along with default values).
  network: [2, [2], 1],    // Perceptron network structure (1 hidden
  // layer).
  population: 50,          // Population by generation.
  elitism: 0.2,            // Best networks kepts unchanged for the next
  // generation (rate).
  randomBehaviour: 0.2,    // New random networks for the next generation
  // (rate).
  mutationRate: 0.1,       // Mutation rate on the weights of synapses.
  mutationRange: 0.5,      // Interval of the mutation changes on the
  // synapse weight.
  historic: 0,             // Latest generations saved.
  lowHistoric: false,      // Only save score (not the network).
  scoreSort: -1,           // Sort order (-1 = desc, 1 = asc).
  nbChild: 1,               // Number of children by breeding.
};


class Neuron {
  /**
   * Artificial Neuron class
   *
   * @constructor
   */
  constructor() {
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
  populate = (nb) => {
    this.weights = [];
    for (let i = 0; i < nb; i++) {
      this.weights.push(this.options.randomClamped());
    }
  }
}


export { Neuron };
