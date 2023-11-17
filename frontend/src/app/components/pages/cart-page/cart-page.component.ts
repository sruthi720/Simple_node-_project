import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { CartItem } from 'src/app/shared/models/cartitem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
//field to hold cart data
cart! : Cart
constructor (private cartService : CartService){
  //cartservice  for use the get  cart observable , and update is cart each time that we have a new value
  this.cartService.getCartObservable().subscribe((cart)=>{
    this.cart= cart //each timne there is a new cart  GIVE IT TO the function

  })
}

removeFromCart(cartItem:CartItem){
  this.cartService.removeFromCart(cartItem.foods.id)
}
changeQuantity(cartItem:CartItem ,QuantityInString :string){
  const quantity =parseInt(QuantityInString)
  this.cartService.changeQuantity(cartItem.foods.id ,quantity)
}
}
