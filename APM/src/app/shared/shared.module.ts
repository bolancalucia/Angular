import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StarComponent } from "./star.component";
import { FormsModule } from "@angular/forms";
import { FavoriteComponent } from "./favourite.component";
import { ProductModule } from "../products/product.module";
import { RatingComponent } from "./rating.component";

@NgModule({
  declarations: [StarComponent, FavoriteComponent, RatingComponent],
  exports: [
    StarComponent,
    FavoriteComponent,
    CommonModule,
    FormsModule,
    RatingComponent
  ],
  imports: [CommonModule]
})
export class SharedModule {}
