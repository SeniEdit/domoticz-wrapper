import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
//import { RouterModule, Routes }   from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { LightsComponent } from './lights.component';
import { ScenesComponent } from './scenes.component';
import { SwitchComponent } from './switch.component';
import { LightingService } from './lighting.service';
import { LocalstorageService } from './localstorage.service';

import { NavbarComponent } from './navbar.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: {icon: "home"} },
  { path: 'settings', component: SettingsComponent, data: {icon: "settings"} },
  { path: '**', component: LightsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SwitchComponent,
    NavbarComponent,
    SettingsComponent,
    LightsComponent,
    ScenesComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot(
      routes
    ),
    BrowserModule,
    HttpModule,
    FormsModule,
  ],
  providers: [LightingService, LocalstorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
