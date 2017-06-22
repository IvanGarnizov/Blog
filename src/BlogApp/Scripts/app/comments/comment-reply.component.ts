import { Component, Input, EventEmitter, Output } from "@angular/core";
import { CommentService } from "./comment.service";
import { Comment } from "./comment";

@Component({
    selector: "comment-reply",
    template:
    `
        <textarea #content></textarea>
        <button (click)="add(content.value)">Add reply</button>
    `
})

export class CommentReplyComponent {
    @Input() commentId: number;
    @Output() onReply: EventEmitter<Comment[]> = new EventEmitter<Comment[]>();

    constructor(private commentService: CommentService) { }

    add(content: string) {
        this.commentService.add(this.commentId, content, true)
            .subscribe(comments => this.onReply.emit(comments));
    }
}