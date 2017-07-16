import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';


import {MdSidenavModule,MdMenuModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; 
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdTabsModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdSlideToggleModule} from '@angular/material';
import {MdGridListModule} from '@angular/material';
import {MdRadioModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

import {MdTableModule} from '@angular/material';
import { MovieService } from './movie.service';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
CdkTableModule,
    BrowserModule,
    MdTableModule,
    MdInputModule,
    FormsModule,
    MdToolbarModule,
    MdSidenavModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdMenuModule,
    MdIconModule,
    FlexLayoutModule,
    MdTabsModule,
    MdCardModule,
    MdSlideToggleModule,
    MdButtonModule,
    MdGridListModule,
    MdRadioModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})


export class AppModule { }
