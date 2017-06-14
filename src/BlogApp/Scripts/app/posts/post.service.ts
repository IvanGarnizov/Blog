import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

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

    private getRequestOptions() {
        return new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
    }
}