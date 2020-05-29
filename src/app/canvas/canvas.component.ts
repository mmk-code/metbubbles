import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.refresh();

    // debounce resize, wait for resize to finish before doing stuff
    // if (this.resizeTimeout) {
    //   clearTimeout(this.resizeTimeout);
    // }
    // this.resizeTimeout = setTimeout((() => {
    //   console.log('Resize complete');
    //   this.refresh();
    // }).bind(this), 500);
  }

  refresh() {
    window.location.reload();
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.circlesService.refresh();
  }
}
