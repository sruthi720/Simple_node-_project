import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent {

  @Input()
  title!:string //any string use it as title

  @Input()
  margin?='1rem 0 1rem 0.2rem' //from top left bottom right, its optional

  @Input()
  fontSize? ='1.7rem '//by default
}
