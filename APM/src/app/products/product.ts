export interface IProduct {
  productId: number;
  productName: string;
  productCode: string;
  description: string;
  price: number;
  starRating: number;
  ratingArray: number[];
  imageUrl: string;
  favourite: boolean;
  reviews: any;
  productRating: string;
}
