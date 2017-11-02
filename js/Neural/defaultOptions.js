/**
* Logistic activation function.
*
* @param {x} Input value.
* @return Logistic function output.
*/
const activation = x => (1 / (1 + Math.exp(-x)));

/**
  * Returns a random value between -1 and 1.
  *
  * @return Random value.
  */
const randomClamped = () => ((Math.random() * 2) - 1);

const defaultOptions = {
  activation,
  randomClamped,

  network: [2, [2], 1],    // Perceptron network structure (1 hidden layer).
  population: 50,          // Population by generation.
  elitism: 0.2,            // Best networks kepts unchanged for the next generation (rate).
  randomBehaviour: 0.2,    // New random networks for the next generation (rate).
  mutationRate: 0.1,       // Mutation rate on the weights of synapses.
  mutationRange: 0.5,      // Interval of the mutation changes on the synapse weight.
  historic: 0,             // Latest generations saved.
  lowHistoric: false,      // Only save score (not the network).
  scoreSort: -1,           // Sort order (-1 = desc, 1 = asc).
  nbChild: 1,              // Number of children by breeding.
};

export { defaultOptions };
