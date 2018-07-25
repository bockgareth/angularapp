import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts;

  constructor(private service: PostService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(response => {
        this.posts = response.json();
        console.log(this.posts);
      });
  }

  createPost(input: HTMLInputElement) {
    let post = {
      title: input.value
    }
    input.value = '';

    this.service.create(post)
      .subscribe(response => {
        post['id'] = response.json().id;
        this.posts.unshift(post);
      });
  }

  updatePost() {
    
  }

}
