import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatServiceService } from './services/chat-service.service';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule, // Add HttpClientModule here
    FormsModule // Add FormsModule here
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ChatServiceService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
