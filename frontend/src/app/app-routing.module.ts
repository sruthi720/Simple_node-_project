import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { FoodPagesComponent } from './components/pages/food-pages/food-pages.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},//show the home component by default
  {path:'search/:searchTerm',component:HomeComponent} , //anything after : is route parameter  // dfestination component of this path
  {path:'food/:id', component:FoodPagesComponent},
  {path:'tag/:tag', component:HomeComponent},
  {path:'cart-page',component:CartPageComponent},

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
