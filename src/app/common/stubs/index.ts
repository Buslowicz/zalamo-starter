import { NgModule } from '@angular/core';

import { RouterLinkStubDirective } from './router-link';
import { RouterOutletStubComponent } from './router-outlet';

@NgModule({
  imports: [],
  exports: [ RouterLinkStubDirective, RouterOutletStubComponent ],
  declarations: [ RouterLinkStubDirective, RouterOutletStubComponent ],
  providers: [],
})
export class Module {
}
