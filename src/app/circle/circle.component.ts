import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: '[mb-circle]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent {
  @Input() x: number;
  @Input() y: number;
  @Input() radius: number;
  @Input() visible: boolean;
  @Input() color: string;

  constructor() { }

  getDisplay() {
    return (this.visible ? 'inherit' : 'none');
  }
}
