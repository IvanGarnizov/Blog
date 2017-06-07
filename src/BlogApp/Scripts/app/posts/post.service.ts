import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

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
}