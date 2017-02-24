import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fallback' })
export class FallbackPipe implements PipeTransform {
  public transform(value: any, fallback: any = ''): any {
    return value == null ? fallback : value;
  }
}
