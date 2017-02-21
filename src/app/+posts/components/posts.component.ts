import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Post } from '../../../types';
import { PostsActions } from '../posts.actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-posts',
  template: `
    <ul>
      <li *ngFor="let post of posts">
        <b>{{post.title}}</b> <i>by</i> <u>{{post.author.firstName}} {{post.author.lastName}}</u>
        <button (click)="actions.upVote(post.id)">{{post.votes}}</button>
        <a [routerLink]="['/posts', post.id]">[Show]</a>
      </li>
    </ul>
`
})
export class PostsComponent {
  @Input() public posts: Array<Post>;

  constructor(public actions: PostsActions) {}
}
