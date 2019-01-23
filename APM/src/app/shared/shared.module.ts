import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';
import { FavoriteComponent } from './favourite.component';
import { ProductModule } from '../products/product.module';

@NgModule({
  declarations: [
    StarComponent,
    FavoriteComponent
  ],
  exports: [
    StarComponent,
    FavoriteComponent,
    CommonModule,
    FormsModule
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
