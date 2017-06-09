///<reference path="../../typings/index.d.ts"/>
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import "rxjs/Rx";

import { AboutComponent } from "./about.component";
import { AppComponent } from "./app.component";
import { CommentListComponent } from "./comments/comment-list.component";
import { HomeComponent } from "./home.component";
import { PostComponent } from "./posts/post.component";
import { PostListComponent } from "./posts/post-list.component";
import { TopicComponent } from "./topics/topic.component";
import { TopicListComponent } from "./topics/topic-list.component";

import { AppRouting } from "./app.routing";

import { PostService } from "./posts/post.service";
import { TopicService } from "./topics/topic.service";

@NgModule({
    // directives, components, and pipes
    declarations: [
        AboutComponent,
        AppComponent,
        CommentListComponent,
        HomeComponent,
        PostComponent,
        PostListComponent,
        TopicComponent,
        TopicListComponent
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
        PostService,
        TopicService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }