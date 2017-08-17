import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
    selector: "login",
    template:
    `
        <h1>Login</h1>
        <div *ngIf="loginError">
            <strong>Warning:</strong> Username or Password mismatch
        </div>
        <form [formGroup]="loginForm" (submit)="performLogin($event)">
            <input formControlName="username" type="text" placeholder="Your username or e-mail address" required autofocus />
            <input formControlName="password" type="password" placeholder="Your password" required />
            <button type="submit">Sign in</button>
        </form>
    `
})

export class LoginComponent {
    loginForm = null;
    loginError = false;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        if (this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }

        this.loginForm = fb.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        })
    }

    performLogin(e) {
        e.preventDefault();

        var username = this.loginForm.value.username;
        var password = this.loginForm.value.password;

        this.authService.login(username, password)
            .subscribe(data => {
                this.loginError = false;
                this.router.navigate([""]);
            },
            err => {
                console.log(err);
                
                this.loginError = true;
            });
    }
}