import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'tilt-measure',
  template: `
    <div>
      <ion-button (click)="startMeasuringTilt()">Medir inclinación</ion-button>
      <ion-button (click)="stopMeasuringTilt()">Detener medición</ion-button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class TiltMeasureComponent {
  angle: number = 0;
  isMeasuringTilt: boolean = false;
  magnitude: number = 0;
  accelHandler: PluginListenerHandle | null = null;

  @Output() tiltChange = new EventEmitter<{
    angle: number;
  }>();

  async startMeasuringTilt() {
    if (!this.isMeasuringTilt) {
      this.isMeasuringTilt = true;
      
      this.accelHandler = await Motion.addListener('accel', event => {
        let x = event.accelerationIncludingGravity?.x || 0;
        let y = event.accelerationIncludingGravity?.y || 0;
        let z = event.accelerationIncludingGravity?.z || 0;
        
        this.calculateTiltAngle(x,y,z);
        // Emit updated values
        this.tiltChange.emit({
          angle: this.angle,
        });
      });
    }
  }

  stopMeasuringTilt() {
    if (this.isMeasuringTilt) {
      this.isMeasuringTilt = false;

      if (this.accelHandler) {
        this.accelHandler.remove();
        this.accelHandler = null;
        Motion.removeAllListeners();
      }

      this.tiltChange.emit({
        angle: this.angle,
      });
    }
  }

  calculateTiltAngle(x: number, y: number, z: number) {
    const magnitude = Math.sqrt(x**2 + y**2 + z**2);
    if (magnitude === 0) {
      this.angle = 0;
    } else {
      const tiltAngleRadians = Math.acos(y / magnitude);
      this.angle = (tiltAngleRadians * 180) / Math.PI; // Convert to degrees
    }
  }
}
