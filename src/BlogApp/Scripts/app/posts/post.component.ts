import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Post } from "./post";
import { PostService } from "./post.service";
import { AuthService } from "./../auth.service"

@Component({
    template:
    `
        <div *ngIf="post">
            <h1>{{post.title}}</h1>
            by {{post.authorName}}
            Viewed {{post.viewsCount}} times
            <h2>Topic: {{post.topicName}}</h2>
            {{post.content}}
            <div class="buttons">
                <button *ngIf="userId == post.authorId || isAdmin" (click)="sendToEdit()">Edit</button>
                <button *ngIf="userId == post.authorId || isAdmin" (click)="delete()">Delete</button>
            </div>
            <h2>Comments:</h2>
            <comment-list></comment-list>
        </div>
    `
})

export class PostComponent {
    post: Post;
    id: number;
    userId: number;
    isAdmin: boolean;

    constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private router: Router, private authService: AuthService) {
        this.id = this.activatedRoute.snapshot.params["id"];

        if (this.authService.isLoggedIn()) {
            this.authService.getUserId()
                .subscribe(userId => this.userId = userId);
            this.authService.isAdmin()
                .subscribe(isAdmin => this.isAdmin = isAdmin);
        }
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