import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Post } from "./post";

const baseUrl = "api/posts/";

@Injectable()
export class PostService {
    constructor(private http: Http) { }

    getMostViewed() {
        return this.http.get(baseUrl + "MostViewed")
            .map(res => res.json());
    }

    get(id: number) {
        return this.http.get(baseUrl + id)
            .map(res => res.json());
    }

    add(title: string, content: string, topicName: number) {
        var post = {
            Title: title,
            Content: content,
            TopicName: topicName
        };

        return this.http.post(baseUrl, post, this.getRequestOptions())
            .map(res => res.json());
    }

    remove(id: number) {
        return this.http.delete(baseUrl + id);
    }

    edit(post: Post) {
        return this.http.put(baseUrl, post, this.getRequestOptions());
    }
    
    private getRequestOptions() {
        return new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
    }
}