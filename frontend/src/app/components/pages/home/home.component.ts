import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 foods:food[]= []; //Food feild holds the data  we get from the food service
 constructor(private foodservice :FoodService){//inject food service inside this home component
            //fodservice = new Foodservice()
    // by this angular will used inside the constructor, and give the variable a new instance OF FOOD SERVICE
    this.foods = foodservice.getAll()
 }
}
