import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AutocompleteChipsComponent } from './autocomplete-chips/autocomplete-chips.component';
import { MaterialSharedModule } from './material-shared/material-shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteChipsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
