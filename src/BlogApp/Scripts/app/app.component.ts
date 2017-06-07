import { Component } from "@angular/core";

@Component({
    selector: "blog",
    template:
    `
        <a [routerLink]="['']">Home</a>
        <a [routerLink]="['about']">About</a>
        <router-outlet></router-outlet>
    `
})

export class AppComponent { }