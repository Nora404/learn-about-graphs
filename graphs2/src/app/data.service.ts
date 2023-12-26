import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

export type Datapoint = {
  name: string,
  countInput: number,
  countOutput: number,
  output: Output[],
}

export type Output = {
  dp: string,
  positionOutput: number,
  positionInput: number
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  http: HttpClient = inject(HttpClient);
  data: Observable<Datapoint[]> = 
    this.http.get<Datapoint[]>('../assets/data.json').pipe(
      map(data =>data.sort((a: Datapoint, b: Datapoint)=>{
        const maxA = Math.max(a.countInput, a.countOutput);
        const maxB = Math.max(b.countInput, b.countOutput);

        return maxB - maxA;
      }))
    );
}
