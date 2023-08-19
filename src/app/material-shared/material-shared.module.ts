import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
  ]
})
export class MaterialSharedModule { }
