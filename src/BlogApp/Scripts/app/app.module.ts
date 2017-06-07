///<reference path="../../typings/index.d.ts"/>
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import "rxjs/Rx";

import { AboutComponent } from "./about.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home.component";
import { PostListComponent } from "./posts/post-list.component";
import { PostComponent } from "./posts/post.component";
import { AppRouting } from "./app.routing";
import { PostService } from "./posts/post.service"

@NgModule({
    // directives, components, and pipes
    declarations: [
        AboutComponent,
        AppComponent,
        HomeComponent,
        PostListComponent,
        PostComponent
    ],
    // modules
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule,
        AppRouting
    ],
    // providers
    providers: [
        PostService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }