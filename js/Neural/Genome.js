class Genome {
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
  constructor(score = 0, network = null) {
    this.score = score;
    this.network = network;
  }
}

export { Genome };

