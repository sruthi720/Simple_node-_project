import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
tags ?:Tag[]//add a text property tag with type Tag[] array
// fill this tags property by injecting foodservice
constructor(foodService:FoodService){
  foodService.getAllTags().subscribe((serverTags)=>{
    this.tags = serverTags
    console.log(this.tags)
  })
}
}
