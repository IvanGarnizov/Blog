import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "./auth.http";
import { User } from "./users/user";
const baseUrl = "api/accounts/";

@Injectable()
export class AuthService {
    authKey = "auth";

    constructor(private http: AuthHttp) { }

    login(username: string, password: string): any {
        var url = "api/connect/token";
        var data = {
            username: username,
            password: password,
            client_id: "Blog",
            grant_type: "password",
            scope: "offline_access profile email"
        };

        return this.http.post(
            url,
            this.toUrlEncodedString(data),
            new RequestOptions({
                headers: new Headers({
                    "Content-Type": "application/x-www-form-urlencoded"
                })
            }))
            .map(res => {
                var auth = res.json();
                console.log("The following auth JSON object has been received:");
                console.log(auth);
                this.setAuth(auth);

                return auth;
            });
    }

    logout(): any {
        this.setAuth(null);

        return true;
    }
    
    toUrlEncodedString(data: any) {
        var body = "";

        for (var key in data) {
            if (body.length) {
                body += "&";
            }

            body += key + "=";
            body += encodeURIComponent(data[key]);
        }

        return body;
    }
    
    setAuth(auth: any): boolean {
        if (auth) {
            localStorage.setItem(this.authKey, JSON.stringify(auth));
        }
        else {
            localStorage.removeItem(this.authKey);
        }

        return true;
    }
    
    getAuth(): any {
        var i = localStorage.getItem(this.authKey);

        if (i) {
            return JSON.parse(i);
        }
        else {
            return null;
        }
    }
    
    isLoggedIn(): boolean {
        return localStorage.getItem(this.authKey) != null;
    }

    getUserId() {
        return this.http.get(baseUrl + "GetUserId")
            .map(res => res.json());
    }

    add(user: User) {
        return this.http.post(baseUrl, JSON.stringify(user), this.getRequestOptions())
            .map(res => res.json());
    }

    isAdmin() {
        return this.http.get(baseUrl + "IsAdmin")
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