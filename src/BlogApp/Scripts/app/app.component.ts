import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "blog",
    template:
    `
        <a [routerLink]="['']">Home</a>
        <a [routerLink]="['about']">About</a>
        <a [routerLink]="['topics']">Topics</a>
        <a *ngIf="authService.isLoggedIn()" [routerLink]="['posts/add']">Add post</a>
        <a *ngIf="authService.isLoggedIn()" [routerLink]="['posts/my']">My posts</a>
        <a *ngIf="!authService.isLoggedIn()" [routerLink]="['login']">Login</a>
        <a *ngIf="!authService.isLoggedIn()" [routerLink]="['register']">Register</a>
        <a *ngIf="authService.isLoggedIn()" href="javascript:void(0)" (click)="logout()">Logout</a>
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