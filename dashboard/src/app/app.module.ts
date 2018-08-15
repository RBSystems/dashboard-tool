import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCardModule, MatListModule, MatMenuModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatSelectModule } from '@angular/material'
import { NgModule } from '@angular/core';
import { SafePipeModule } from 'safe-pipe'

import { AppComponent } from './app.component';
import { APIService} from './api.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '../../node_modules/@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    SafePipeModule,
    BrowserModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
