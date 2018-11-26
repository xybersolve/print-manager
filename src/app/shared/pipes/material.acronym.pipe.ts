import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xsMaterialAcronym'
})
export class MaterialAcronymPipe implements PipeTransform {
  transform(value: string) {
    return value.split( /\b(?=[a-z])/ig )
      .map( token => token[0] )
      .join( '' ).toUpperCase();
  }
}
