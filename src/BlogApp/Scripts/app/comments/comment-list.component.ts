import { Component, OnInit } from "@angular/core";
import { Comment } from "./comment";
import { ActivatedRoute } from "@angular/router";
import { CommentService } from "./comment.service";
import { AuthService } from "./../auth.service";

@Component({
    selector: "comment-list",
    template:
    `
        <div *ngIf="comments">
            <h3 *ngIf="!comments.length">No comments</h3>
            <ul>
                <li *ngFor="let comment of comments">
                    <h3>{{comment.authorName}} said:</h3>
                    <div *ngIf="commentEdit && commentEdit.id == comment.id">
                        <textarea [(ngModel)]="commentEdit.content"></textarea>
                        <button (click)="edit()">Edit</button>
                    </div>
                    <div *ngIf="!commentEdit || (commentEdit && commentEdit.id != comment.id)">
                        {{comment.content}}
                        <div class="buttons">
                            <button *ngIf="comment.authorId == userId || isAdmin" (click)="showEditBox(comment)">Edit</button>
                            <button *ngIf="comment.authorId == userId || isAdmin" (click)="remove(comment.id)">Delete</button>
                            <button *ngIf="authService.isLoggedIn()" (click)="showReplyBox(comment.id)">Reply</button>
                        </div>
                        <comment-reply *ngIf="comment.id == replyToCommentId" [commentId]="comment.id" (onReply)="onReply($event)"></comment-reply>
                    </div>
                    <ul>
                        <li class="reply" *ngFor="let reply of comment.replies">
                            <h3>{{reply.authorName}} said to {{reply.repliedToAuthorName}}:</h3>
                            <div *ngIf="commentEdit && commentEdit.id == reply.id">
                                <textarea [(ngModel)]="commentEdit.content"></textarea>
                                <button (click)="edit()">Edit</button>
                            </div>
                            <div *ngIf="!commentEdit || (commentEdit && commentEdit.id != reply.id)">
                                {{reply.content}}
                                <div class="buttons">
                                    <button *ngIf="reply.authorId == userId || isAdmin" (click)="showEditBox(reply)">Edit</button>
                                    <button *ngIf="reply.authorId == userId || isAdmin" (click)="remove(reply.id)">Delete</button>
                                    <button *ngIf="authService.isLoggedIn()" (click)="showReplyBox(reply.id)">Reply</button>
                                </div>
                                <comment-reply *ngIf="reply.id == replyToCommentId" [commentId]="reply.id" (onReply)="onReply($event)"></comment-reply>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <comment-add *ngIf="authService.isLoggedIn()" [postId]="postId" (onComment)="onComment($event)"></comment-add>
        </div>
    `
})

export class CommentListComponent {
    comments: Comment[];
    replyToCommentId: number;
    postId: number;
    commentEdit: Comment;
    userId: number;
    isAdmin: boolean;

    constructor(private activatedRoute: ActivatedRoute, private commentService: CommentService, private authService: AuthService) {
        this.postId = this.activatedRoute.snapshot.params["id"];
    }

    ngOnInit() {
        this.commentService.get(this.postId)
            .subscribe(comments => this.comments = comments);

        if (this.authService.isLoggedIn()) {
            this.authService.getUserId()
                .subscribe(userId => this.userId = userId);
            this.authService.isAdmin()
                .subscribe(isAdmin => this.isAdmin = isAdmin);
        }
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

    showEditBox(comment: Comment) {
        this.commentEdit = comment;
    }

    edit(isReply: boolean) {
        this.commentService.edit(this.commentEdit)
            .subscribe(comments => { this.comments = comments; this.commentEdit = null; });
    }
}