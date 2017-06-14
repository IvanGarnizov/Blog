import { Component, Input } from "@angular/core";
import { Post } from "./post";
import { Router } from "@angular/router";

@Component({
    selector: "post-list",
    template:
    `
        <ul>
            <li *ngFor="let post of posts" (click)="select(post.id)">{{post.title}}</li>
        </ul>
    `
})

export class PostListComponent {
    @Input() posts: Post[]

    constructor(private router: Router) { }

    select(id: number) {
        this.router.navigate(["posts", id]);
    }
}