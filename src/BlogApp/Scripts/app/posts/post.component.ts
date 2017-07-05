import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Post } from "./post";
import { PostService } from "./post.service";

@Component({
    template:
    `
        <div *ngIf="post">
            <h1>{{post.title}} by {{post.authorName}}</h1>
            <h2>Topic: {{post.topicName}}</h2>
            {{post.content}}
            <button (click)="edit()">Edit</button>
            <button (click)="remove()">Delete</button>
            <h2>Comments:</h2>
            <comment-list [comments]="post.comments"></comment-list>
        </div>
    `
})

export class PostComponent {
    post: Post;
    id: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private postService: PostService,
        private router: Router
    ) {
        this.id = this.activatedRoute.snapshot.params["id"];
    }

    ngOnInit() {
        this.postService.get(this.id)
            .subscribe(post => this.post = post);
    }

    remove() {
        this.postService.remove(this.id)
            .subscribe(res => this.router.navigate([""]));
    }

    edit() {
        this.router.navigate(["posts/" + this.id + "/edit"]);
    }
}