import { Neuron } from './Neuron';

class Layer {
  /**
   * Neural Network Layer class.
   *
   * @constructor
   * @param {index} Index of this Layer in the Network.
   */
  constructor(index) {
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
  populate = (nbNeurons, nbInputs) => {
    this.neurons = [];
    for (let i = 0; i < nbNeurons; i++) {
      const n = new Neuron();
      n.populate(nbInputs);
      this.neurons.push(n);
    }
  }
}

export { Layer };
