import { Generation } from './Generation';
import { Network } from './Network';
import { defaultOptions } from './defaultOptions';


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
