import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

const baseUrl = "api/comments/";

@Injectable()
export class CommentService {
    constructor(private http: Http) { }

    add(postId: number, content: string) {
        var comment = {
            PostId: postId,
            Content: content
        }

        return this.http.post(baseUrl, comment, this.getRequestOptions())
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