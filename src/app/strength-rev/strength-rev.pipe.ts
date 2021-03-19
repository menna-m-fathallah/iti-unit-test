import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strength'
})
export class StrengthRevPipe implements PipeTransform {
  transform(value: number): number {
    if (value >90) {
      return 5;

    } else if (value <= 90 && value > 80) {
      return 4;
    }
     
  }
}
