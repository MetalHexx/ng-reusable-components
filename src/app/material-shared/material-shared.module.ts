import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
  ]
})
export class MaterialSharedModule { }
