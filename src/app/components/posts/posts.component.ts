import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AppError } from '../../common/app-error';
import { BadInputError } from '../../common/bad-input';

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
      .subscribe(
        response => {
          this.posts = response.json();
        },
        (error: AppError) => {
          console.log('An unexpected error occurred.', error);
        });
  }

  createPost(input: HTMLInputElement) {
    let post = {
      title: input.value
    }
    input.value = '';

    this.service.create(post)
      .subscribe(
        response => {
          post['id'] = response.json().id;
          this.posts.unshift(post);
        },
        (error: AppError) => {
          if (error instanceof BadInputError)
            console.log('Bad Input');
          else 
            console.log('An unexpected error occurred.', error);          
        });
  }

  updatePost(post) {
    this.service.update(post)
      .subscribe(response => { console.log(response.json()) });
  }

  deletePost(post) {
    this.service.delete(post.id)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
  }

}
