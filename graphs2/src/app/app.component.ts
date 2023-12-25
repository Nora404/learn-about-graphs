import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService, Datapoint } from './data.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'graphs2';
  data$: Observable<Datapoint[]> = inject(DataService).data;

  biggerNumber(n1: number, n2: number):number{
    return n1 > n2 ? n1 : n2; 
  }

  createArray(n: number){
    let array = [];
    for(let i = 1; i <= n; i++){
      array.push(i);
    }
    return array;
  }
  
}
