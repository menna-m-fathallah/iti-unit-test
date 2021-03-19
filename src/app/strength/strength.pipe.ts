import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strength'
})
export class StrengthPipe implements PipeTransform {
  pipeName = '';
  transform(value: number): string {
    if (value < 10) {
      this.pipeName = 'bad'
      return value + 'bad';

    } else if (value >= 10 && value < 20) {
      this.pipeName = 'good'
      return value + 'good';
    } else {
      this.pipeName = 'verygood'
      return value + 'verygood';
    }
  }
}
