import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/cart';
import { CartItem } from '../shared/models/cartitem';
import { food } from '../shared/models/food';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //define a field that holda the cart like this any time we refresh the browser the cart will be removed  , so use the local storage ,  for that ther are 2 methods---- one for setting cart to the local storage  other for getting cart from  the local storage
  private cart :Cart =this.getCartFromLocalStorage()
  private cartSubject :BehaviorSubject<Cart> =new BehaviorSubject(this.cart)

  constructor() { }

  addToCart(foods:food):void{
    let cartItem =this.cart.items.find((item)=> item.foods.id=== foods.id) //find the item if inside cart
    if(cartItem) return;
    this.cart.items.push(new CartItem(foods))
   //anything changes in the cart then
   this.setCartToLocalstorage()
  }

  removeFromCart(foodId : string):void{
    this.cart.items = this.cart.items.filter((item)=>item.foods.id != foodId)
    this.setCartToLocalstorage()
  }

  changeQuantity(foodId: string , quantity:number){
    //first find cart item
    let cartItem =this.cart.items.find((item)=>item.foods.id ===foodId)
    if(!cartItem) return //if cartItem is unavilable return
    //else
    cartItem.quantity = quantity
    cartItem.price = quantity * cartItem.foods.price

    this.setCartToLocalstorage()

    }

    clearCart(){
      this.cart =new Cart()
      this.setCartToLocalstorage()
    }

    getCartObservable():Observable<Cart>{
      //it will return observable of type cart , having an observable in cartIS WE RETURN THIS CART SUBJECT  and covert it to observable using as observable method,we send it as obserbale becuse we send subject to outside - we could be able to change the value of the subject we dont want it to happen
      return this.cartSubject.asObservable()
    }

 //define a field that holda the cart like this any time we refresh the browser the cart will be removed  , so use the local storage ,  for that ther are 2 methods---- one for setting cart to the local storage  other for getting cart from  the local storage
  private  setCartToLocalstorage():void{  ////we fdont want them toi accessible from outside so private

      //set total price and quantity , here reduce() will call 2 times if cart has 2 items ----prevSum=0+20
      this.cart.totalPrice = this.cart.items.reduce((prevSum , currentItem )=> prevSum +currentItem.price ,0)
      this.cart.totalCount = this.cart.items.reduce((prevSum , currentItem )=> prevSum +currentItem.quantity ,0)



    const cartJson = JSON.stringify(this.cart) //string JSON representation of cart
    localStorage.setItem('cart',cartJson)

    //set anything to local stoarge means we are changing the cart so anybody who is listening the observable should be notify all the listeners of the cart obsetvable
    this.cartSubject.next(this.cart)
  }

  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('cart')
    return cartJson? JSON.parse(cartJson) :new Cart() //if cartJson is available the pArse else print an empty cart
  }
}
