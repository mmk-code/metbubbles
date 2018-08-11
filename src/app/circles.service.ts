import { Injectable } from '@angular/core';
import { Circle } from './circle';

const MAX_CIRCLES = 50;

@Injectable({
  providedIn: 'root'
})
export class CirclesService {
  circleMap: Map<any, any> = new Map<any, any>();
  circles: Array<Circle> = [];
  sourceCircles: Array<Circle> = [];
  pairs: Array<any> = [];
  timeStep = 0;
  canvasWidth: number;
  canvasHeight: number;

  constructor() {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;

    for (let i = 0; i < MAX_CIRCLES; i++) {
      // Prevent xMove and yMove from equal to zero at same time. Circles will move in all directions.
      // Use OR in do-while loop for moving diagonally only.
      // Use xm = 0 for moving vertically with AND in do-while loop.
      // Use ym = 0 for moving horizontally with AND in do-while loop.
      // Keep n in do-while loop to prevent unexpected infinit loop (if happened).
      let xm, ym: number;
      let n = 0;
      do {
        n++;
        xm = this.randomInt(-2, 2); // -2..2
        ym = this.randomInt(-2, 2); // -2..2
      } while (xm === 0 && ym === 0 && n < 10); // if n < 1, this will allow static circles (circles not moving)

      // Make a circle object with push.
      this.sourceCircles.push({
        x: this.randomInt(0, this.canvasWidth), // 0..canvasWidth
        y: this.randomInt(0, this.canvasHeight), // 0..canvasHeight
        radius: this.randomInt(10, 110), // 10..110
        visible: true,
        color: 'rgba(128,128,128,0.5)',

        // Move on each frame
        xMove: xm,
        yMove: ym
      });
    }

    // NOT OPTIMAL -
    // Total number of pairs is n*(n+1) / 2 - n. This is sum of 1+2+3+...+n=n*(n+1)/2 minus the diagnal which is n.
    // for 100 circles there is 4950 pairs are quite a big number for something we need to be iterating on every frame.
    // Collision detection is in fact one of the bigger performance bottlenecks of this
    // project.  A more sophisticated implementation might use some kind of spatial index
    // or other optimization tricks to do collision detection with less effort.
    for (let i = 0; i < this.sourceCircles.length - 1; i++) {
      for (let j = i; j < this.sourceCircles.length - 1; j++) {
        this.pairs.push([this.sourceCircles[i], this.sourceCircles[j + 1]]);
      }
    }
    console.log(`Number of pairs for ${MAX_CIRCLES} elements is`, this.pairs.length);
  }

  update() {
    this.timeStep++;

    for (const sourceCircle of this.sourceCircles) {
      this.moveCircle(sourceCircle);
    }

    for (const pair of this.pairs) {
      const [left, right] = pair;
      const dist = this.getDistance(left, right);
      const overlap = dist - left.radius - right.radius;

      if (overlap < 0) {
        // Overlap!
        // midpoint = average of the two coordinates
        const midX = (left.x + right.x) / 2;
        const midY = (left.y + right.y) / 2;

        const radius = -overlap / 2;
        let collisionCircle = this.circleMap.get(pair); // get collied circle if thier pair are previously overlaped.
        if (collisionCircle) {  // if the overlap pair is previuosly overlaped then update collied circle values
          collisionCircle.x = midX;
          collisionCircle.y = midY;
          collisionCircle.radius = radius;
        } else { // otherwise add the new collied circle to the display circles and to Map with pair as key and collied circle as value.
          collisionCircle = { x: midX, y: midY, radius };
          this.circles.push(collisionCircle);
          this.circleMap.set(pair, collisionCircle);
        }

        if (!collisionCircle.visible) {
          collisionCircle.visible = true;

          // Gray scale
          // const red = this.timeStep % 256;
          // const green = this.timeStep % 256;
          // const blue = this.timeStep % 256;
          // Color!
          const red = this.timeStep % 256;
          const green = (this.timeStep + 85) % 256;
          const blue = (this.timeStep + 85 + 85) % 256;

          collisionCircle.color = `rgba(${red}, ${green}, ${blue}, 0.5)`;
        }

      } else if (this.circleMap.has(pair)) { // Remove collied circles if thier pair not more overlaped.
        this.circleMap.get(pair).visible = false;
      }
    }
  }

  moveCircle(circle: Circle) {
    circle.x += circle.xMove;
    circle.y += circle.yMove;

    if (circle.x > (this.canvasWidth + circle.radius)) {
      circle.x = 0 - circle.radius;
    }
    if (circle.x < (0 - circle.radius)) {
      circle.x = this.canvasWidth + circle.radius;
    }
    if (circle.y > (this.canvasHeight + circle.radius)) {
      circle.y = 0 - circle.radius;
    }
    if (circle.y < (0 - circle.radius)) {
      circle.y = this.canvasHeight + circle.radius;
    }
  }

  // This is an application of the Pythagorean theorem that calculates the distance
  // between the centerpoints of two circles.
  getDistance(circle1: Circle, circle2: Circle) {
    return Math.sqrt(
      // The ** here is the ES7 exponentiation operator (https://github.com/rwaldron/exponentiation-operator)
      (circle2.x - circle1.x) ** 2 + (circle2.y - circle1.y) ** 2
    );
  }

  // randomInt - return random integer number between [min, max].
  // Math.random function return random number in interval [0, 1).
  // If no paramters randomInt() return integer random number between [0, 1].
  // In order to return random number between two number min and max we increase max by 1.
  randomInt(min = 0, max = 1) {
    if (min > max) {
      [min, max] = [max, min]; // swap variables - using Destructuring feature of Typescript
    }
    console.log(`[min, max] = [${min} , ${max}]`);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
