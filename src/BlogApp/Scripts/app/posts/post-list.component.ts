import { Component, Input } from "@angular/core";
import { Post } from "./post";
import { Router } from "@angular/router";

@Component({
    selector: "post-list",
    template:
    `
        <ul class="post-list">
            <li *ngFor="let post of posts">
                <a (click)="sendToPost(post.id)">{{post.title}}</a>
            </li>
        </ul>
    `
})

export class PostListComponent {
    @Input() posts: Post[]

    constructor(private router: Router) { }

    sendToPost(id: number) {
        this.router.navigate(["posts", id]);
    }
}