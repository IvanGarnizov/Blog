import { Component, OnInit } from "@angular/core";
import { PostService } from "./post.service";
import { Post } from "./post";
import { Router } from "@angular/router";

@Component({
    selector: "post-list",
    template:
    `
        <ul>
            <li *ngFor="let post of posts" (click)="select(post.id)">{{post.id}}. {{post.title}}</li>
        </ul>
    `
})

export class PostListComponent {
    posts: Post[]

    constructor(private postService: PostService, private router: Router) { }

    ngOnInit() {
        this.postService.getMostViewed()
            .subscribe(posts => this.posts = posts);
    }

    select(id: number) {
        this.router.navigate(["post", id]);
    }
}