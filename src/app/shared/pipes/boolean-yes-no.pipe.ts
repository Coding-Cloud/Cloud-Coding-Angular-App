import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanYesNo'
})
export class BooleanYesNoPipe implements PipeTransform {
  transform(value: boolean, ..._args: unknown[]): string {
    return value ? 'Oui' : 'Non';
  }
}
