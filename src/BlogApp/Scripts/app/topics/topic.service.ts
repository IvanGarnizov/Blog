import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

const baseUrl = "api/topics/";

@Injectable()
export class TopicService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(baseUrl)
            .map(res => res.json());
    }

    get(id: number) {
        return this.http.get(baseUrl + id)
            .map(res => res.json());
    }
}