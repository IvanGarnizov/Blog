import { Component, Input } from "@angular/core";
import { Comment } from "./comment";
import { ActivatedRoute } from "@angular/router";
import { CommentService } from "./comment.service";

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
        <textarea #content placeholder="Content..."></textarea>
        <button (click)="addComment(content.value); content.value = '';">Add comment</button>
    `
})

export class CommentListComponent {
    @Input() comments: Comment[];

    constructor(private activatedRoute: ActivatedRoute, private commentService: CommentService) { }

    addComment(content: string) {
        var postId = this.activatedRoute.snapshot.params["id"];

        this.commentService.add(postId, content)
            .subscribe(comments => this.comments = comments);
    }
}