import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

const baseUrl = "api/comments/";

@Injectable()
export class CommentService {
    constructor(private http: Http) { }

    add(id: number, content: string, isReply: boolean) {
        var comment: any = {
            Content: content
        };

        if (isReply) {
            comment.CommentId = id;
        } else {
            comment.PostId = id;
        }

        return this.http.post(baseUrl, comment, this.getRequestOptions())
            .map(res => res.json());
    }

    remove(id: number) {
        return this.http.delete(baseUrl + id)
            .map(res => res.json());
    }

    private getRequestOptions() {
        return new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
    }
}