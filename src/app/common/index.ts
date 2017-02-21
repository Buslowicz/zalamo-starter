import { NgModule } from '@angular/core';
import { ObjFormatPipe, OrderByPipe, FallbackPipe } from './pipes';

@NgModule({
  declarations: [
    ObjFormatPipe,
    OrderByPipe,
    FallbackPipe
  ],
  exports: [
    ObjFormatPipe,
    OrderByPipe,
    FallbackPipe
  ]
})
export class AppCommonModule {}

export * from './decorators';
export * from './pipes';
export * from './reducer.helpers';

export function ObjectValues(obj) {
  return Object.keys(obj).map((key) => obj[ key ]);
}
