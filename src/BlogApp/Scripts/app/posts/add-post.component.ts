import { Component } from "@angular/core";
import { PostService } from "./post.service";
import { Router } from "@angular/router";

@Component({
    template:
    `
        <label>Title:</label>
        <input type="text" #title />
        <label>Content:</label>
        <textarea #content></textarea>
        <label>Topic:</label>
        <topic-select (notify)="onNotify($event)"></topic-select>
        <button (click)="addPost(title.value, content.value)">Add post</button>
    `
})

export class AddPostComponent {
    topicId: number;

    constructor(private postService: PostService, private router: Router) { }

    addPost(title: string, content: string) {
        this.postService.add(title, content, this.topicId)
            .subscribe(id => this.router.navigate(["posts", id]));
    }

    onNotify(topicId: number) {
        this.topicId = topicId;
    }
}