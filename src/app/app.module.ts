import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AutocompleteChipsComponent } from './autocomplete-chips/autocomplete-chips.component';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteChipsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
