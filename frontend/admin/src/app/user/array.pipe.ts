import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ArrayPipe',
})
export class ArrayPipe implements PipeTransform {
  transform(value: string | number | string[]): string[] {
    if (typeof value === 'object') {
      return value;
    }
    return [''];
  }
}
