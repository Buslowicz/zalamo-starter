import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to stringify object with a pattern
 */
@Pipe({ name: 'stringify' })
export class ObjFormatPipe implements PipeTransform {
  public transform(value: any, args: string): string {
    if (!value) {
      return '';
    }
    if (!args) {
      return JSON.stringify(value);
    }
    return args.replace(/\{([^}]+)}/g, (_, prop) => value[ prop ]);
  }
}
