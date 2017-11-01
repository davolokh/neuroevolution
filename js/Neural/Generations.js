import { Generation } from './Generation';
import { Network } from './Network';


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

class Generations {
  /**
   * Generations class.
   *
   * Hold's previous Generations and current Generation.
   *
   * @constructor
   */
  constructor() {
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
  firstGeneration = () => {
    const out = [];
    for (let i = 0; i < this.options.population; i++) {
      // Generate the Network and save it.
      const nn = new Network();
      nn.perceptronGeneration(this.options.network[0],
        this.options.network[1],
        this.options.network[2]);
      out.push(nn.getSave());
    }

    this.generations.push(new Generation());
    return out;
  }

  /**
   * Create the next Generation.
   *
   * @return Next Generation.
   */
  nextGeneration = () => {
    if (this.generations.length === 0) {
      // Need to create first generation.
      return false;
    }

    const gen = this.generations[this.generations.length - 1]
      .generateNextGeneration();
    this.generations.push(new Generation());
    return gen;
  }

  /**
   * Add a genome to the Generations.
   *
   * @param {genome}
   * @return False if no Generations to add to.
   */
  addGenome = (genome) => {
    // Can't add to a Generation if there are no Generations.
    if (this.generations.length === 0) return false;

    // FIXME addGenome returns void.
    return this.generations[this.generations.length - 1].addGenome(genome);
  }

}

export { Generations };
