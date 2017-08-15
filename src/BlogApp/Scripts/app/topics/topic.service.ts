import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Topic } from "./topic";
import { AuthHttp } from "./../auth.http";

const baseUrl = "api/topics/";

@Injectable()
export class TopicService {
    constructor(private http: AuthHttp) { }

    getAll() {
        return this.http.get(baseUrl)
            .map(res => res.json());
    }

    get(id: number) {
        return this.http.get(baseUrl + id)
            .map(res => res.json());
    }

    add(name: string) {
        var topic = {
            Name: name
        };

        return this.http.post(baseUrl, topic, this.getRequestOptions())
            .map(res => res.json());
    }

    delete(id: number) {
        return this.http.delete(baseUrl + id)
            .map(res => res.json());
    }

    edit(topic: Topic) {
        return this.http.put(baseUrl, topic, this.getRequestOptions())
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