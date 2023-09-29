import { Injectable } from '@angular/core';
import { sample } from 'rxjs';
import { sample_foods } from 'src/data';
import { food } from '../shared/models/food';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }
  //get all the data of foods from data.ts // in future connected to the backend to get the data from the backend
  getAll():food[]{
    //blocke of the code
    return sample_foods
  }
}
