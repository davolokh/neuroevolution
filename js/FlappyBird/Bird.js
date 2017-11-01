class Bird {
  constructor(json) {
    this.x = 80;
    this.y = 250;
    this.width = 40;
    this.height = 30;

    this.alive = true;
    this.gravity = 0;
    this.velocity = 0.3;
    this.jump = -6;

    this.init(json);
  }

  init = (json) => {
    for (const i in json) {
      this[i] = json[i];
    }
  }

  flap = () => {
    this.gravity = this.jump;
  }

  update = () => {
    this.gravity += this.velocity;
    this.y += this.gravity;
  }

  isDead = (height, pipes) => {
    if (this.y >= height || this.y + this.height <= 0) {
      return true;
    }
    for (const i in pipes) {
      if (!(
        this.x > pipes[i].x + pipes[i].width ||
        this.x + this.width < pipes[i].x ||
        this.y > pipes[i].y + pipes[i].height ||
        this.y + this.height < pipes[i].y
      )) {
        return true;
      }
    }
  }
}

export { Bird };
