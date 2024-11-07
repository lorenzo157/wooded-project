import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { NgrokSkipBrowserWarningInterceptor } from './auth/ngrok.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },provideHttpClient(),{
    provide: HTTP_INTERCEPTORS,
    useClass: NgrokSkipBrowserWarningInterceptor,
    multi: true, // This makes Angular apply it globally
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
