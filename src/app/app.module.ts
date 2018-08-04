import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { CircleComponent } from './circle/circle.component';
import { CirclesService } from './circles.service';


@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    CircleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    CirclesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
