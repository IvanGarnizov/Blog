import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

const baseUrl = "api/users/";

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getPosts() {
        return this.http.get(baseUrl + "Posts")
            .map(res => res.json());
    }
}