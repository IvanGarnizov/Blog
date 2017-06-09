import { Component, OnInit } from "@angular/core";
import { PostService } from "./posts/post.service";
import { Post } from "./posts/post";

@Component({
    selector: "home",
    template:
    `
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