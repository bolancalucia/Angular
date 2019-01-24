import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IProduct } from "src/app/products/product";

@Component({
  selector: "pm-favourite",
  templateUrl: "./favourite.component.html",
  styleUrls: ["./favourite.component.css"]
})
export class FavoriteComponent implements OnInit {
  @Input() isFavourite: boolean;
  @Input() currentProduct: IProduct;
  @Output() favouriteClicked: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  
  constructor() {}
 
  ngOnInit() {}

  onFavouriteClicked(): void {
    this.currentProduct.favourite = !this.currentProduct.favourite;
    this.favouriteClicked.emit(this.currentProduct);
  }
}
