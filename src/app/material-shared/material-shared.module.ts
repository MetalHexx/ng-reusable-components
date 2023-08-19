import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
// ... add other Angular Material imports

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    // ... add other Angular Material modules
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    // ... export the same list so they can be used in other modules
  ]
})
export class MaterialSharedModule { }
