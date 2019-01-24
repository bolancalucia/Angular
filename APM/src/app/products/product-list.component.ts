import { Component, OnInit, OnChanges } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnChanges {
  pageTitle: string = "Product List";
  imageWidth: number = 150;
  imageMargin: number = 10;
  showImage: boolean = false;
  errorMessage: string;
  reviewMessage: string;
  isFavourite: boolean;
  _listFilter: string;
  favouriteProducts: IProduct[];
  filteredProducts: IProduct[];
  products: IProduct[] = [];

  constructor(private productService: ProductService) {}
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        product.description.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }
  onRatingClicked(rating: number): void {
    this.reviewMessage = `${rating}/5 from 3 reviews`;
    this.products.forEach(product => {
      if (product.starRating === rating)
        product.productRating = this.reviewMessage;
    });
  }
  onFavouriteClicked(favourite: IProduct): void {
    this.favouriteProducts = this.products.filter(
      fav => fav.favourite === true
    );
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => (this.errorMessage = <any>error)
    );
  }
  ngOnChanges(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => (this.errorMessage = <any>error)
    );
  }
}
