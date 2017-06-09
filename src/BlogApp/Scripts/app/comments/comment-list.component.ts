import { Component, Input } from "@angular/core";
import { Comment } from "./comment";

@Component({
    selector: "comment-list",
    template:
    `
        <h3 *ngIf="!comments.length">No comments</h3>
        <ul>
            <li *ngFor="let comment of comments">
                <h3 *ngIf="comment.isReply">{{comment.authorName}} said to {{comment.repliedToAuthorName}}:</h3>
                <h3 *ngIf="!comment.isReply">{{comment.authorName}} said:</h3>
                {{comment.content}}
            </li>
        </ul>
    `
})

export class CommentListComponent {
    @Input() comments: Comment[];
}