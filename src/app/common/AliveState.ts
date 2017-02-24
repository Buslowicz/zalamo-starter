/* 3rd party modules */
import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/operator/takeWhile';

export class AliveState implements OnDestroy {
  private _alive = true;

  public ngOnDestroy(): void {
    this._alive = false;
  }

  protected subscribeWhileAlive(...subjects: Array<Observable<any>>): void {
    subjects.forEach((subject) => subject.takeWhile(() => this._alive).subscribe());
  }
}
