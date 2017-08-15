import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    template: `
        <div *ngIf="errorMessage">{{errorMessage}}</div>
        <form [formGroup]="userForm" (submit)="onSubmit()">
            <input type="text" formControlName="username" placeholder="Username..." />
            <input type="text" formControlName="email" placeholder="Email..." />
            <input type="password" formControlName="password" placeholder="Password..." />
            <input type="password" formControlName="passwordConfirm" placeholder="Confirm Password..." />
            <input type="submit" [disabled]="!userForm.valid" />
            <div>{{userForm.valid}}</div>
        </form>
    `
})

export class RegisterComponent {
    userForm: FormGroup;
    errorMessage: string;

    constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
        if (authService.isLoggedIn()) {
            router.navigate([""]);
        }
    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            username: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]+")]],
            email: ["", [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
            password: ["", [Validators.required, Validators.minLength(1)]],
            passwordConfirm: ["", [Validators.required, Validators.minLength(1)]]
        }, {
            validator: this.comparePasswords('password', 'passwordConfirm')
        });
    }

    comparePasswords(passwordFormControl: string, passwordConfirmFormControl: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordFormControl];
            let passwordConfirm = group.controls[passwordConfirmFormControl];

            if (password.value === passwordConfirm.value) {
                return null;
            }

            return { compareFailed: true };
        };
    }

    onSubmit() {
        this.authService.add(this.userForm.value)
            .subscribe((data) => {
                if (data.Error) {
                    this.errorMessage = data.Error;
                } else {
                    this.authService.login(this.userForm.value.username, this.userForm.value.password)
                        .subscribe(() => this.router.navigate([""]));
                }
            }, (err) => {
                console.log(err);
            });
    }
}