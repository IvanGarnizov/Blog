import { Component, Input, EventEmitter, Output } from "@angular/core";
import { CommentService } from "./comment.service";
import { Comment } from "./comment";

@Component({
    selector: "comment-add",
    template:
    `
        <textarea #content placeholder="Content..."></textarea>
        <button (click)="add(content.value); content.value = '';">Add comment</button>
    `
})

export class CommentAddComponent {
    @Input() postId: number;
    @Output() onComment: EventEmitter<Comment[]> = new EventEmitter<Comment[]>();

    constructor(private commentService: CommentService) { }

    add(content: string) {
        this.commentService.add(this.postId, content, false)
            .subscribe(comments => this.onComment.emit(comments));
    }
}