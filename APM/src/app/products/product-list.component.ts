import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage : string;
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    };
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    favouriteProducts: IProduct[];
    filteredProducts: IProduct[];
    products: IProduct[] = [];
    constructor(private productService : ProductService) {
    }
    toggleImage(): void {
        this.showImage = !this.showImage;
    };
    ngOnInit(): void {
        this.productService.getProducts()
            .subscribe(products => {
                this.products = products;
                this.filteredProducts = this.products;
            }, error => this.errorMessage = <any>error);
    }
    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
    changeFavourite(id : number): void {
        console.log(id);
        this.products.forEach((product: IProduct) => {
            if(product.productId === id) {
                product.favourite = !product.favourite;
            }      
        }); 
        // this.filteredProducts = this.products.filter((product: IProduct) => {
        //     product.favourite === true;
        // });
    }
}