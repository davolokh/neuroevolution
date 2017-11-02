import { Generations } from './Generations';
import { Network } from './Network';
import { Genome } from './Genome';
import { defaultOptions } from './defaultOptions';


/**
 * Provides a set of classes and methods for handling Neuroevolution and
 * genetic algorithms.
 *
 * @param {options} An object of options for Neuroevolution.
 */
class Neuroevolution {
  constructor(options) {
    // Declaration of module parameters (options) and default values
    this.options = { ...defaultOptions, options };
    this.generations = new Generations();
  }

  /**
   * Reset and create a new Generations object.
   *
   * @return void.
   */
  restart = () => {
    this.generations = new Generations();
  }

  /**
   * Create the next generation.
   *
   * @return Neural Network array for next Generation.
   */
  nextGeneration = () => {
    let networks = [];

    if (this.generations.generations.length === 0) {
      // If no Generations, create first.
      networks = this.generations.firstGeneration();
    } else {
      // Otherwise, create next one.
      networks = this.generations.nextGeneration();
    }

    // Create Networks from the current Generation.
    const nns = [];
    for (const i in networks) {
      const nn = new Network();
      nn.setSave(networks[i]);
      nns.push(nn);
    }

    if (this.options.lowHistoric) {
      // Remove old Networks.
      if (this.generations.generations.length >= 2) {
        const genomes =
          this.generations
            .generations[this.generations.generations.length - 2]
            .genomes;
        for (const i in genomes) {
          delete genomes[i].network;
        }
      }
    }

    if (this.options.historic !== -1) {
      // Remove older generations.
      if (this.generations.generations.length > this.options.historic + 1) {
        this.generations.generations.splice(0,
          this.generations.generations.length - (this.options.historic + 1));
      }
    }

    return nns;
  }

  /**
   * Adds a new Genome with specified Neural Network and score.
   *
   * @param {network} Neural Network.
   * @param {score} Score value.
   * @return void.
   */
  networkScore = (network, score) => {
    this.generations.addGenome(new Genome(score, network.getSave()));
  }
}

export { Neuroevolution };

