import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xsSortBySize'
})
export class SortBySizePipe implements PipeTransform {
  transform(items: Array<Object>): Array<Object> {
    return items.filter(item => {
      // const noMatchingKey = Object.keys(filter).find(key => item[key] !== filter[key]);
      // return !noMatchingKey;
      items.sort((a: any, b: any) => {
        if (item['size'] < item['size'] ) {
            return -1;
        } else if ( item['size'] > item['size'] ) {
            return 1;
        } else {
            return 0;
        }
      });
    });
  }
}
