import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-pages',
  templateUrl: './food-pages.component.html',
  styleUrls: ['./food-pages.component.css']
})
export class FoodPagesComponent {
foods!:food
constructor(activatedRoute:ActivatedRoute, foodService:FoodService ,private cartService :CartService ,private router :Router) {
  activatedRoute.params.subscribe((params) => {
    if(params.id)
      foodService.getFoodById(params.id).subscribe((serverFood) => {
        this.foods = serverFood
      })
  })
 }
 addToCart(){
  this.cartService.addToCart(this.foods)
  this.router.navigateByUrl('/cart-page')
 }

}
