import { Layer } from './Layer';
import { defaultOptions } from './defaultOptions';


class Network {
  /**
   * Neural Network class
   *
   * Composed of Neuron Layers.
   *
   * @constructor
   */
  constructor() {
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
  perceptronGeneration = (input, hiddens, output) => {
    let index = 0;
    let previousNeurons = 0;
    const inputLayer = new Layer(index);
    inputLayer.populate(input, previousNeurons); // Number of Inputs will be set to
    // 0 since it is an input layer.
    previousNeurons = input;  // number of input is size of previous layer.
    this.layers.push(inputLayer);
    index++;
    for (const i in hiddens) {
      // Repeat same process as first layer for each hidden layer.
      const hiddenLayer = new Layer(index);
      hiddenLayer.populate(hiddens[i], previousNeurons);
      previousNeurons = hiddens[i];
      this.layers.push(hiddenLayer);
      index++;
    }
    const outputLayer = new Layer(index);
    outputLayer.populate(output, previousNeurons);  // Number of input is equal to
    // the size of the last hidden
    // layer.
    this.layers.push(outputLayer);
  }

  /**
   * Create a copy of the Network (neurons and weights).
   *
   * Returns number of neurons per layer and a flat array of all weights.
   *
   * @return Network data.
   */
  getSave = () => {
    const datas = {
      neurons: [], // Number of Neurons per layer.
      weights: [], // Weights of each Neuron's inputs.
    };

    for (const i in this.layers) {
      datas.neurons.push(this.layers[i].neurons.length);
      for (const j in this.layers[i].neurons) {
        for (const k in this.layers[i].neurons[j].weights) {
          // push all input weights of each Neuron of each Layer into a flat
          // array.
          datas.weights.push(this.layers[i].neurons[j].weights[k]);
        }
      }
    }
    return datas;
  }

  /**
   * Apply network data (neurons and weights).
   *
   * @param {save} Copy of network data (neurons and weights).
   * @return void
   */
  setSave = (save) => {
    let previousNeurons = 0;
    let index = 0;
    let indexWeights = 0;
    this.layers = [];
    for (const i in save.neurons) {
      // Create and populate layers.
      const layer = new Layer(index);
      layer.populate(save.neurons[i], previousNeurons);
      for (const j in layer.neurons) {
        for (const k in layer.neurons[j].weights) {
          // Apply neurons weights to each Neuron.
          layer.neurons[j].weights[k] = save.weights[indexWeights];

          indexWeights++; // Increment index of flat array.
        }
      }
      previousNeurons = save.neurons[i];
      index++;
      this.layers.push(layer);
    }
  }

  /**
   * Compute the output of an input.
   *
   * @param {inputs} Set of inputs.
   * @return Network output.
   */
  compute = (inputs) => {
    // Set the value of each Neuron in the input layer.
    for (const i in inputs) {
      if (this.layers[0] && this.layers[0].neurons[i]) {
        this.layers[0].neurons[i].value = inputs[i];
      }
    }

    let prevLayer = this.layers[0]; // Previous layer is input layer.
    for (let i = 1; i < this.layers.length; i++) {
      for (const j in this.layers[i].neurons) {
        // For each Neuron in each layer.
        let sum = 0;
        for (const k in prevLayer.neurons) {
          // Every Neuron in the previous layer is an input to each Neuron in
          // the next layer.
          sum += prevLayer.neurons[k].value
            * this.layers[i].neurons[j].weights[k];
        }

        // Compute the activation of the Neuron.
        this.layers[i].neurons[j].value = this.options.activation(sum);
      }
      prevLayer = this.layers[i];
    }

    // All outputs of the Network.
    const out = [];
    const lastLayer = this.layers[this.layers.length - 1];
    for (const i in lastLayer.neurons) {
      out.push(lastLayer.neurons[i].value);
    }
    return out;
  }

}

export { Network };
