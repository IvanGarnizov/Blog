import { Component, OnInit } from "@angular/core";
import { PostService } from "./posts/post.service";
import { Post } from "./posts/post";

@Component({
    selector: "home",
    template:
    `
        <h1>Welcome to Blog!</h1>
        <h2>Top 5 most popular posts!</h2>
        <post-list [posts]="posts"></post-list>
    `
})

export class HomeComponent {
    posts: Post[]

    constructor(private postService: PostService) { }

    ngOnInit() {
        this.postService.getMostViewed()
            .subscribe(posts => this.posts = posts);
    }
}