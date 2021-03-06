﻿import { Component, OnInit } from "@angular/core";
import { PostService } from "./../posts/post.service";
import { Post } from "./../posts/post";

@Component({
    template:
    `
        <h1>Your posts</h1>
        <post-list [posts]="posts"></post-list>
    `
})

export class UserPostsComponent {
    posts: Post[]

    constructor(private postService: PostService) { }

    ngOnInit() {
        this.postService.getForCurrentUser()
            .subscribe(posts => this.posts = posts);
    }
}