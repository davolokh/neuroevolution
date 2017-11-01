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

class Generation {
  /**
   * Generation class.
   *
   * Composed of a set of Genomes.
   *
   * @constructor
   */
  constructor() {
    this.genomes = [];
    this.options = defaultOptions;
  }

  /**
   * Add a genome to the generation.
   *
   * @param {genome} Genome to add.
   * @return void.
   */
  addGenome = (genome) => {
    // Locate position to insert Genome into.
    // The gnomes should remain sorted.
    let i;
    for (i = 0; i < this.genomes.length; i++) {
      // Sort in descending order.
      if (this.options.scoreSort < 0) {
        if (genome.score > this.genomes[i].score) {
          break;
        }
        // Sort in ascending order.
      } else if (genome.score < this.genomes[i].score) {
        break;
      }
    }

    // Insert genome into correct position.
    this.genomes.splice(i, 0, genome);
  }

  /**
   * Breed to genomes to produce offspring(s).
   *
   * @param {g1} Genome 1.
   * @param {g2} Genome 2.
   * @param {nbChilds} Number of offspring (children).
   */
  breed = (g1, g2, nbChilds) => {
    const datas = [];
    for (let nb = 0; nb < nbChilds; nb++) {
      // Deep clone of genome 1.
      const data = JSON.parse(JSON.stringify(g1));
      for (const i in g2.network.weights) {
        // Genetic crossover
        // 0.5 is the crossover factor.
        // FIXME Really should be a predefined constant.
        if (Math.random() <= 0.5) {
          data.network.weights[i] = g2.network.weights[i];
        }
      }

      // Perform mutation on some weights.
      for (const i in data.network.weights) {
        if (Math.random() <= this.options.mutationRate) {
          data.network.weights[i] += Math.random()
            * this.options.mutationRange
            * 2
            - this.options.mutationRange;
        }
      }
      datas.push(data);
    }

    return datas;
  }

  /**
   * Generate the next generation.
   *
   * @return Next generation data array.
   */
  generateNextGeneration = () => {
    const nexts = [];

    for (let i = 0; i < Math.round(this.options.elitism
      * this.options.population); i++) {
      if (nexts.length < this.options.population) {
        // Push a deep copy of ith Genome's Nethwork.
        nexts.push(JSON.parse(JSON.stringify(this.genomes[i].network)));
      }
    }

    for (let i = 0; i < Math.round(this.options.randomBehaviour
      * this.options.population); i++) {
      const n = JSON.parse(JSON.stringify(this.genomes[0].network));
      for (const k in n.weights) {
        n.weights[k] = this.options.randomClamped();
      }
      if (nexts.length < this.options.population) {
        nexts.push(n);
      }
    }

    let max = 0;
    while (true) { // eslint-disable-line
      for (let i = 0; i < max; i++) {
        // Create the children and push them to the nexts array.
        const childs = this.breed(this.genomes[i], this.genomes[max],
          (this.options.nbChild > 0 ? this.options.nbChild : 1));
        for (const c in childs) {
          nexts.push(childs[c].network);
          if (nexts.length >= this.options.population) {
            // Return once number of children is equal to the
            // population by generatino value.
            return nexts;
          }
        }
      }
      max++;
      if (max >= this.genomes.length - 1) {
        max = 0;
      }
    }
  }
}

export { Generation };
