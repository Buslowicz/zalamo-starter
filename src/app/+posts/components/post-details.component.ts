import { Component, Input } from '@angular/core';
import { Author, Post } from '../../../types';

@Component({
  selector: 'app-post-details',
  template: `
    <h2>{{post.title}} ({{post.votes}})</h2>
    <h3>{{printName(post.author)}}</h3>
`
})
export class PostDetailsComponent {
  @Input() public post: Post;

  public printName(author: Author): string {
    return author ? `${author.firstName} ${author.lastName}` : '';
  }
}
