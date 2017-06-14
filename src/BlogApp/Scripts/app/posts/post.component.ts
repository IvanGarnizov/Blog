import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Post } from "./post";
import { PostService } from "./post.service";

@Component({
    template:
    `
        <div *ngIf="post">
            <h1>{{post.title}}</h1>
            {{post.content}}
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
    ) { }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.params["id"];
        
        this.postService.get(this.id)
            .subscribe(post => this.post = post);
    }

    remove() {
        this.postService.remove(this.id)
            .subscribe(res => this.router.navigate([""]));
    }
}