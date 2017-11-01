import { Bird } from './Bird';
import { Pipe } from './Pipe';
import { Neuroevolution } from '../Neural/Neuroevolution';

const Neuvol = new Neuroevolution({
  population: 50,
  network: [2, [2], 1],
});

class Game {
  constructor(images) {
    this.pipes = [];
    this.birds = [];
    this.score = 0;
    this.canvas = document.querySelector('#flappy');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.spawnInterval = 90;
    this.interval = 0;
    this.gen = [];
    this.alives = 0;
    this.generation = 0;
    this.backgroundSpeed = 0.5;
    this.backgroundx = 0;
    this.maxScore = 0;

    this.images = images;
  }

  start = () => {
    this.interval = 0;
    this.score = 0;
    this.pipes = [];
    this.birds = [];

    this.gen = Neuvol.nextGeneration();
    console.log(this.gen);
    for (const i in this.gen) { // eslint-disable-line
      const b = new Bird();
      this.birds.push(b);
    }
    this.generation++;
    this.alives = this.birds.length;
  }

  update = () => {
    this.backgroundx += this.backgroundSpeed;
    let nextHoll = 0;
    if (this.birds.length > 0) {
      for (let i = 0; i < this.pipes.length; i += 2) {
        if (this.pipes[i].x + this.pipes[i].width > this.birds[0].x) {
          nextHoll = this.pipes[i].height / this.height;
          break;
        }
      }
    }

    for (const i in this.birds) {
      if (this.birds[i].alive) {
        const inputs = [
          this.birds[i].y / this.height,
          nextHoll,
        ];

        const res = this.gen[i].compute(inputs);
        if (res > 0.5) {
          this.birds[i].flap();
        }

        this.birds[i].update();
        if (this.birds[i].isDead(this.height, this.pipes)) {
          this.birds[i].alive = false;
          this.alives--;
          // console.log(this.alives);
          Neuvol.networkScore(this.gen[i], this.score);
          if (this.isItEnd()) {
            this.start();
          }
        }
      }
    }

    for (let i = 0; i < this.pipes.length; i++) {
      this.pipes[i].update();
      if (this.pipes[i].isOut()) {
        this.pipes.splice(i, 1);
        i--;
      }
    }

    if (this.interval === 0) {
      const deltaBord = 50;
      const pipeHoll = 120;
      const hollPosition = Math.round(Math.random() * (this.height - deltaBord * 2 - pipeHoll)) + deltaBord;
      this.pipes.push(new Pipe({ x: this.width, y: 0, height: hollPosition }));
      this.pipes.push(new Pipe({ x: this.width, y: hollPosition + pipeHoll, height: this.height }));
    }

    this.interval++;
    if (this.interval === this.spawnInterval) {
      this.interval = 0;
    }

    this.score++;
    this.maxScore = (this.score > this.maxScore) ? this.score : this.maxScore;

    if (window.FPS === 0) {
      window.setZeroTimeout(() => {
        this.update();
      });
    } else {
      setTimeout(() => {
        this.update();
      }, 1000 / window.FPS);
    }
  }


  isItEnd = () => {
    for (const i in this.birds) {
      if (this.birds[i].alive) {
        return false;
      }
    }
    return true;
  }

  display = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < Math.ceil(this.width / this.images.background.width) + 1; i++) {
      this.ctx.drawImage(this.images.background, i * this.images.background.width - Math.floor(this.backgroundx % this.images.background.width), 0);
    }

    for (const i in this.pipes) {
      if (i % 2 === 0) {
        this.ctx.drawImage(this.images.pipetop, this.pipes[i].x, this.pipes[i].y + this.pipes[i].height - this.images.pipetop.height, this.pipes[i].width, this.images.pipetop.height);
      } else {
        this.ctx.drawImage(this.images.pipebottom, this.pipes[i].x, this.pipes[i].y, this.pipes[i].width, this.images.pipetop.height);
      }
    }

    this.ctx.fillStyle = '#FFC600';
    this.ctx.strokeStyle = '#CE9E00';
    for (const i in this.birds) {
      if (this.birds[i].alive) {
        this.ctx.save();
        this.ctx.translate(this.birds[i].x + this.birds[i].width / 2, this.birds[i].y + this.birds[i].height / 2);
        this.ctx.rotate(Math.PI / 2 * this.birds[i].gravity / 20);
        this.ctx.drawImage(this.images.bird, -this.birds[i].width / 2, -this.birds[i].height / 2, this.birds[i].width, this.birds[i].height);
        this.ctx.restore();
      }
    }

    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Oswald, sans-serif';
    this.ctx.fillText(`Score : ${this.score}`, 10, 25);
    this.ctx.fillText(`Max Score : ${this.maxScore}`, 10, 50);
    this.ctx.fillText(`Generation : ${this.generation}`, 10, 75);
    this.ctx.fillText(`Alive : ${this.alives} / ${Neuvol.options.population}`, 10, 100);

    requestAnimationFrame(() => {
      this.display();
    });
  }
}

export { Game };
