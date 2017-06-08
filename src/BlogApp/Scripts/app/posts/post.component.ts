import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Post } from "./post";
import { PostService } from "./post.service";

@Component({
    template:
    `
        <div *ngIf="post">
            <h1>{{post.title}}</h1>
            {{post.content}}
            <h2>Comments:</h2>
            <textarea name="content" placeholder="Content..."></textarea>
            <button>Add comment</button>
        </div>
    `
})

export class PostComponent {
    post: Post

    constructor(private activatedRoute: ActivatedRoute, private postService: PostService) { }

    ngOnInit() {
        var id = this.activatedRoute.snapshot.params["id"];

        this.postService.get(id)
            .subscribe(post => this.post = post);
    }
}