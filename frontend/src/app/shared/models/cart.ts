import { CartItem } from "./cartitem";



export class Cart{
  items:CartItem[] = []; //constructor(public foods :food){ }
                         //quantity:number = 1 ;
                        // price: number = this.foods.price;
  totalPrice:number = 0;
  totalCount:number = 0;
}
