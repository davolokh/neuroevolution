import { defaultOptions } from './defaultOptions';

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
