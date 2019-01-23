import { Component, OnInit, OnChanges } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnChanges {
    pageTitle: string = 'Product List';
    imageWidth: number = 80;
    imageMargin: number = 5;
    showImage: boolean = false;
    errorMessage : string;
    isFavourite: boolean;
    _listFilter: string;
    favouriteProducts: IProduct[];
    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private productService : ProductService) {
    }
    get listFilter(): string {
        return this._listFilter;
    };
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
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
        return this.products.filter((product: IProduct) => ((product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 ) 
                || (product.description.toLocaleLowerCase().indexOf(filterBy) !== -1 )));
    }
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
    // changeFavourite(id : number): void {
    //     console.log(id);
    //     this.products.forEach((product: IProduct) => {
    //         if(product.productId === id) {
    //             product.favourite = !product.favourite;
    //         }      
    //     }); 
    //     // this.filteredProducts = this.products.filter((product: IProduct) => {
    //     //     product.favourite === true;
    //     // });
    // }
    onFavouriteClicked(favourite: IProduct): void {
        this.favouriteProducts = this.products.filter(fav => fav.favourite === true)
    }
    ngOnChanges(): void {
        // this.productService.getProducts().subscribe(
        //     products => {
        //         this.products = products;
        //         this.filteredProducts = this.products;
        //     }, 
        //     error => this.errorMessage = <any>error
        // );
    }

    
}