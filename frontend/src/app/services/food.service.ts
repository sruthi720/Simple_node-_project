import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, sample } from 'rxjs';
import { sample_foods, sample_tags } from 'src/data';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAG_URL, FOODS_URL } from '../shared/models/constant/urls';
import { food } from '../shared/models/food';
import { Tag } from '../shared/models/tag';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }


  //get all the data of foods from data.ts // in future connected to the backend to get the data from the backend
  getAll():Observable<food[]>{
    //blocke of the code
    return this.http.get<food[]>(FOODS_URL)
  }

  getAllFoodsBySearchTerms(searchTerm:string){
    //pizza Pizza bot should same
    return this.http.get<food[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }

  getFoodById(foodId : string) :Observable<food>{ // if retuns undefined somthing the new food returns
    return this.http.get<food>(FOODS_BY_ID_URL + foodId)
  }

  //for getting all the tags
 getAllTags():Observable<Tag[]>{
  return this.http.get<Tag[]>(FOODS_TAG_URL)
 }

  //getting ALL THE FOODS by a tag
  getAllFoodsByTag(tag:string):Observable<food[]>{
    return tag ==="All"?
    this.getAll():
    this.http.get<food[]>(FOODS_BY_TAG_URL + tag)
  }
}
