import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Motion } from '@capacitor/motion';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'tilt-measure',
  template: `
    <div>
      <p>x: {{ x }}</p>
      <p>y: {{ y }}</p>
      <p>z: {{ z }}</p>
      <ion-button  (click)="startMeasuring()">Start Measuring</ion-button >
      <ion-button (click)="stopMeasuring()">Stop Measuring</ion-button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class TiltMeasureComponent implements OnInit, OnDestroy {
  angle: number = 0;
  x: number = 0;
  y: number = 0;
  z: number = 0;
  isMeasuring: boolean = false;

  ngOnInit() {
    // Initially, no listener is active
  }

  startMeasuring() {
    if (!this.isMeasuring) {
      this.isMeasuring = true;
      console.log('comienza a mover')
      Motion.addListener('accel', (event) => {
        this.x = event.acceleration.x || 0;
        this.y = event.acceleration.y || 0;
        this.z = event.acceleration.z || 0;
      });
      console.log('ahora escuha')
      //this.calculateTiltAngle();
    }
  }

  stopMeasuring() {
    if (this.isMeasuring) {
      this.isMeasuring = false;
      Motion.removeAllListeners(); // Remove the listener when stopping
      this.resetValues(); // Optional: Reset the displayed values when stopped
    }
  }

  resetValues() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
  calculateTiltAngle() {
    const magnitude = Math.sqrt(this.x * 2 + this.y * 2 + this.z ** 2);
    const tiltAngleRadians = Math.acos(this.z / magnitude);
    this.angle = (tiltAngleRadians * 180) / Math.PI; // Convert to degrees
  }

  ngOnDestroy() {
    // Ensure listeners are removed if the component is destroyed
    Motion.removeAllListeners();
  }
}