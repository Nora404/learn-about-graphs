import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  http: HttpClient = inject(HttpClient);

  data = this.http.get('../assets/data.json').subscribe(data => {
    console.log(data);
  });
}
