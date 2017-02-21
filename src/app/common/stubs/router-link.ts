import { Directive, Input, HostListener } from '@angular/core';

@Directive({ selector: '[routerLink]' })
export class RouterLinkStubDirective {
  @Input('routerLink') public routerLink: any;
  public navigatedTo: any = null;

  @HostListener('click') public onClick() {
    this.navigatedTo = this.routerLink;
  }
}
