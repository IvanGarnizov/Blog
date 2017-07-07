import { Component, OnInit } from "@angular/core";
import { Post } from "./post";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "./post.service";

@Component({
    template:
    `
        <div *ngIf="post">
            <label>Title</label>
            <input type="text" [(ngModel)]="post.title" />
            <label>Content:</label>
            <textarea [(ngModel)]="post.content"></textarea>
            <topic-select (notify)="topicChosen($event)"></topic-select>
            <button (click)="edit()">Edit</button>
        </div>
    `
})

export class PostEditComponent {
    id: number;
    post: Post;

    constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private router: Router) {
        this.id = this.activatedRoute.snapshot.params["id"];
    }

    ngOnInit() {
        this.postService.get(this.id)
            .subscribe(post => { this.post = post; this.post.TopicId = 1; });
    }

    topicChosen(topicId: number) {
        this.post.TopicId = topicId;
    }

    edit() {
        this.postService.edit(this.post)
            .subscribe(() => this.router.navigate(["posts", this.id]));
    }
}