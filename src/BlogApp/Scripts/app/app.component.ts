import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "blog",
    template:
    `
        <nav class="nav">
            <ul class="menu">
                <li [routerLink]="['']">Home</li>
                <li [routerLink]="['topics']">Topics</li>
                <li *ngIf="authService.isLoggedIn()" [routerLink]="['posts/add']">Add post</li>
                <li *ngIf="authService.isLoggedIn()" [routerLink]="['posts/my']">My posts</li>
                <li *ngIf="!authService.isLoggedIn()" class="right" [routerLink]="['login']">Login</li>
                <li *ngIf="!authService.isLoggedIn()" class="right" [routerLink]="['register']">Register</li>
                <li *ngIf="authService.isLoggedIn()" class="right" (click)="logout()">Logout</li>
            </ul>
        </nav>
        <div class="main-container">
            <router-outlet></router-outlet>
        </div>
    `
})

export class AppComponent {
    constructor(private router: Router, private authService: AuthService) { }

    logout(): boolean {
        if (this.authService.logout()) {
            this.router.navigate([""]);
        }

        return false;
    }
}