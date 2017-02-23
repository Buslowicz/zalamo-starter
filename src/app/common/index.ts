import { NgModule } from '@angular/core';
import { ObjFormatPipe, OrderByPipe, FallbackPipe, StringFormatPipe } from './pipes';

@NgModule({
  declarations: [
    ObjFormatPipe,
    OrderByPipe,
    FallbackPipe,
    StringFormatPipe
  ],
  exports: [
    ObjFormatPipe,
    OrderByPipe,
    FallbackPipe,
    StringFormatPipe
  ]
})
export class AppCommonModule {}

export * from './decorators';
export * from './pipes';
export * from './reducer.helpers';
export * from './named-router';

export function ObjectValues(obj) {
  return Object.keys(obj).map((key) => obj[ key ]);
}
