import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService, Datapoint } from './data.service';
import { Observable} from 'rxjs';

export type Line = {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit{
  title = 'graphs2';
  data$: Observable<Datapoint[]> = inject(DataService).data;
  datapointSize = 150;
  lines: Line[] = []

  test(){
    console.log(this.lines);
  }

  ngAfterViewInit(): void {
      this.data$.subscribe(data =>{
        data.forEach(datapoint => {
          if(datapoint.output.length > 0){
            datapoint.output.forEach(line=>{
              // x/left/horizontal --- y/top/vertikal
              const elemStart = document.getElementById(datapoint.name + 'output' +  line.positionOutput);
              const elemTaget = document.getElementById(line.dp + 'input' +  line.positionInput);
              const posStart = elemStart ? elemStart.getBoundingClientRect(): {left:0,top:0};
              const posTaget = elemTaget ? elemTaget.getBoundingClientRect(): {left:0,top:0};

              this.lines.push({
                x1: Math.floor(posStart.left +5),
                y1: Math.floor(posStart.top +5),
                x2: Math.floor(posTaget.left +5),
                y2: Math.floor(posTaget.top +5),
              });

              // console.log(
              //   'Von:' + datapoint.name + ' Position: ' + line.positionOutput, Math.floor(posStart.left +5), Math.floor(posStart.top +5),
              //   'Nach:' + line.dp + ' Position: ' + line.positionInput, Math.floor(posTaget.left +5), Math.floor(posTaget.top +5)
              //   );
            })
          }
        });
      })
  }



  biggerNumber(n1: number, n2: number): number {
    return n1 > n2 ? n1 : n2;
  }

  createArray(n: number) {
    let array = [];
    for (let i = 1; i <= n; i++) {
      array.push(i);
    }
    return array;
  }

  calculateSpread(): number {
    let result = 0;
    let test = this.data$.subscribe((elements) => {
      let horizontal = Math.ceil(Math.sqrt(elements.length));
      let vertical = Math.ceil(elements.length / horizontal);

      while (horizontal * vertical < elements.length) {
        horizontal++;
        vertical = Math.ceil(elements.length / horizontal);
      }
      result = horizontal;
    });
    test.unsubscribe;

    return result;
  }

  showMyPoint(event: MouseEvent, datapoint: string, io: string){
    console.log(datapoint, io)
    console.log(event.x, event.y)
  }
}
