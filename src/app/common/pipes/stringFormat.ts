import { startCase } from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stringFormat' })
export class StringFormatPipe implements PipeTransform {
  public transform(value: any, method: string): string {
    switch (method) {
      case 'startCase':
        return startCase(value);
      default:
        return value;
    }
  }
}
