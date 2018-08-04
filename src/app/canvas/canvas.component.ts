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
  height: number;
  width: number;

  constructor(private circlesService: CirclesService) {
    this.circles = this.circlesService.circles;
  }

  ngOnInit() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.running = true;
    this.animationFrame();
  }

  ngOnDestroy() {
    this.running = false;
  }

  toggleRunning() {
    this.running = !this.running;
    if (this.running) {
      this.animationFrame();
    }
  }

  animationFrame() {
    this.circlesService.update();
    if (this.running) {
      requestAnimationFrame(() => this.animationFrame());
    }
  }

  getViewBox() {
    return `0 0 ${this.width} ${this.height}`;
  }

}
