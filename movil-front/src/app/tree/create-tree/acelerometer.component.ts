import { Component, OnDestroy, OnInit } from '@angular/core';
import { Motion } from '@capacitor/motion';

@Component({
  selector: 'app-tilt-measure',
  template: ` <div>Tilt Angle: {{ angle }}°</div> `,
})
export class TiltMeasureComponent implements OnInit, OnDestroy {
  angle: number = 0;
  x: number = 0;
  y: number = 0;
  z: number = 0;

  ngOnInit() {
    Motion.addListener('accel', (event) => {
      this.x = event.acceleration.x;
      this.y = event.acceleration.y;
      this.z = event.acceleration.z;

      this.calculateTiltAngle();
    });
  }

  calculateTiltAngle() {
    const magnitude = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    const tiltAngleRadians = Math.acos(this.z / magnitude);
    this.angle = (tiltAngleRadians * 180) / Math.PI; // Convert to degrees
  }

  ngOnDestroy() {
    Motion.removeAllListeners();
  }
}
