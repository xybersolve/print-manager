import { Pipe, PipeTransform } from '@angular/core';
import { splitAtColon } from '@angular/compiler/src/util';

@Pipe({
  name: 'xsSizeFormat'
})
export class SizeFormatPipe implements PipeTransform {
  transform(value: string, mode: string) {
    value = value.toLowerCase();
    switch (mode) {
      case 'fancy':
        const num = value.split('x');
        return `${num[0]}" x ${num[1]}"`;
        break;
      case 'short':
        value = value.replace(/"/g, '');
        return value.replace(/\s/g, '');
        break;
    }
  }
}
