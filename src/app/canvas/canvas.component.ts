import { Component, OnInit, OnDestroy } from '@angular/core';
import { Circle } from '../circle';
import { CirclesService } from '../circles.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, OnDestroy {
  running = false;
  circles: Array<Circle> = [];
  sourceCircles: Array<Circle> = [];
  canvasHeight: number;
  canvasWidth: number;

  constructor(private circlesService: CirclesService) { }

  ngOnInit() {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.running = true;
    this.circles = this.getCircles();
    this.sourceCircles = this.getSourceCircles();
    this.animateFrame();
  }

  ngOnDestroy() {
    this.running = false;
  }

  getCircles() {
    return this.circlesService.circles;
  }

  getSourceCircles() {
    return this.circlesService.sourceCircles;
  }

  toggleRunning() {
    this.running = !this.running;
    if (this.running) {
      this.animateFrame();
    }
  }

  animateFrame() {
    this.circlesService.update();
    if (this.running) {
      requestAnimationFrame(() => this.animateFrame());
    }
  }

  getViewBox() {
    return `0 0 ${this.canvasWidth} ${this.canvasHeight}`;
  }
}
