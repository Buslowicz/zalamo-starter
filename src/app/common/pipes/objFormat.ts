import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'objFormat' })
export class ObjFormatPipe implements PipeTransform {
  public transform(value: any, args: string): string {
    if (!value) {
      return '';
    }
    return args.replace(/\{([^}]+)}/g, (_, prop) => value[ prop ]);
  }
}
