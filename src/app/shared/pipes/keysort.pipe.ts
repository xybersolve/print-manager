import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xsSortByKey'
})
export class SortByKeyPipe implements PipeTransform {
  transform(items: Array<Object>, arg: string): Array<Object> {
    return items.filter(item => {
      // const noMatchingKey = Object.keys(filter).find(key => item[key] !== filter[key]);
      // return !noMatchingKey;
      items.sort((a: any, b: any) => {
        if (item[arg] < item[arg] ) {
            return -1;
        } else if ( item[arg] > item[arg] ) {
            return 1;
        } else {
            return 0;
        }
      });
    });
  }
}

