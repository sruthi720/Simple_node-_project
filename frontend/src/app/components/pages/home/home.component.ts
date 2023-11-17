import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 foods:food[]= []; //Food feild holds the data  we get from the food service
 constructor(private foodservice :FoodService , activatedRoute :ActivatedRoute){//inject food service inside this home component
            // same as foodservice = new Foodservice()
    // by this angular will used inside the constructor, and give the variable a new instance OF FOOD SERVICE
    //to listen to the route use instance of activated route,then listen to the route params, fot that subscribe the fuction inside the params, call fuction at any time params changes

    let foodsObservable : Observable<food[]>

    activatedRoute.params.subscribe((params) => {
    if(params.searchTerm)
    foodsObservable = this.foodservice.getAllFoodsBySearchTerms(params.searchTerm)
    else if(params.tag)
    foodsObservable = this.foodservice.getAllFoodsByTag(params.tag)
    else
    foodsObservable = foodservice.getAll()  // if there is no searchterm run default


    foodsObservable.subscribe((serverFood) => {
      this.foods =serverFood
    })
  })
 //instead of foods we are setting the result of these services inside an observable,
 //now we are getting the values of these services After else method ,so we can subscribe to it,and its name could be anything

 }
//get the observable of the 3 mothods then
//we need to subcribe to its values
 //then set it to foods field
}
