import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { Post } from "./../posts/post";

@Component({
    template:
    `
        <post-list [posts]="posts"></post-list>
    `
})

export class UserPostsComponent {
    posts: Post[]

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getPosts()
            .subscribe(posts => this.posts = posts);
    }
}