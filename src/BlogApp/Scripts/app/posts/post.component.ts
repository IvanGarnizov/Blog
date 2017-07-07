import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Post } from "./post";
import { PostService } from "./post.service";

@Component({
    template:
    `
        <div *ngIf="post">
            <h1>{{post.title}}</h1>
            by {{post.authorName}}
            Viewed {{post.viewsCount}} times
            <h2>Topic: {{post.topicName}}</h2>
            {{post.content}}
            <button (click)="sendToEdit()">Edit</button>
            <button (click)="delete()">Delete</button>
            <h2>Comments:</h2>
            <comment-list></comment-list>
        </div>
    `
})

export class PostComponent {
    post: Post;
    id: number;

    constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private router: Router) {
        this.id = this.activatedRoute.snapshot.params["id"];
    }

    ngOnInit() {
        this.postService.get(this.id)
            .subscribe(post => this.post = post);
    }

    delete() {
        this.postService.delete(this.id)
            .subscribe(() => this.router.navigate([""]));
    }

    sendToEdit() {
        this.router.navigate(["posts/" + this.id + "/edit"]);
    }
}