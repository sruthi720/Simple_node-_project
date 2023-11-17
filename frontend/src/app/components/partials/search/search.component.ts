import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm =''
//if use any accesmodifier  before parameter it can be access through out the class , if no acess modifier then it can only accessed in side the constructor
 constructor(activatedRoute:ActivatedRoute , private router :Router){
  activatedRoute.params.subscribe((params) => {
    if(params.searchTerm) this.searchTerm =params.searchTerm // read the data from route and show it insuide the search box
  })
 }

 //need to be able to send data to the route from the netreing something to search box
 search(term :string):void {
  if(term) this.router.navigateByUrl('/search/'+term)
 }
}
