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
                <h3>{{comment.authorName}} said:</h3>
                {{comment.content}}
                <button (click)="remove(comment.id)">Delete</button>
                <button (click)="showReplyBox(comment.id)">Reply</button>
                <comment-reply *ngIf="comment.id == replyToCommentId" [commentId]="comment.id" (onReply)="onReply($event)"></comment-reply>
                <ul>
                    <li *ngFor="let reply of comment.replies">
                        <h3>{{reply.authorName}} said to {{reply.repliedToAuthorName}}:</h3>
                        {{reply.content}}
                        <button (click)="remove(reply.id)">Delete</button>
                        <button (click)="showReplyBox(reply.id)">Reply</button>
                        <comment-reply *ngIf="reply.id == replyToCommentId" [commentId]="reply.id" (onReply)="onReply($event)"></comment-reply>
                    </li>
                </ul>
            </li>
        </ul>
        <comment-add [postId]="postId" (onComment)="onComment($event)"></comment-add>
    `
})

export class CommentListComponent {
    @Input() comments: Comment[];
    replyToCommentId: number;
    postId: number;

    constructor(private activatedRoute: ActivatedRoute, private commentService: CommentService) {
        this.postId = this.activatedRoute.snapshot.params["id"];
    }

    remove(id: number) {
        this.commentService.remove(id)
            .subscribe(comments => this.comments = comments);
    }

    showReplyBox(commentId: number) {
        this.replyToCommentId = commentId;
    }

    onReply(comments: Comment[]) {
        this.replyToCommentId = 0;
        this.comments = comments;
    }

    onComment(comments: Comment[]) {
        this.comments = comments;
    }
}