///<reference path="../../typings/index.d.ts"/>
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import "rxjs/Rx";

import { AppComponent } from "./app.component";
import { CommentAddComponent } from "./comments/comment-add.component";
import { CommentListComponent } from "./comments/comment-list.component";
import { CommentReplyComponent } from "./comments/comment-reply.component";
import { HomeComponent } from "./home.component";
import { LoginComponent } from "./login.component";
import { PostAddComponent } from "./posts/post-add.component";
import { PostComponent } from "./posts/post.component";
import { PostEditComponent } from "./posts/post-edit.component";
import { PostListComponent } from "./posts/post-list.component";
import { RegisterComponent } from "./register.component";
import { TopicAddComponent } from "./topics/topic-add.component";
import { TopicComponent } from "./topics/topic.component";
import { TopicListComponent } from "./topics/topic-list.component";
import { TopicSelectComponent } from "./topics/topic-select.component";
import { UserPostsComponent } from "./users/user-posts.component";

import { AppRouting } from "./app.routing";

import { AuthHttp } from "./auth.http";
import { AuthService } from "./auth.service";
import { CommentService } from "./comments/comment.service";
import { PostService } from "./posts/post.service";
import { TopicService } from "./topics/topic.service";

@NgModule({
    // directives, components, and pipes
    declarations: [
        AppComponent,
        CommentAddComponent,
        CommentListComponent,
        CommentReplyComponent,
        HomeComponent,
        LoginComponent,
        PostAddComponent,
        PostComponent,
        PostEditComponent,
        PostListComponent,
        RegisterComponent,
        TopicAddComponent,
        TopicComponent,
        TopicListComponent,
        TopicSelectComponent,
        UserPostsComponent
    ],
    // modules
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AppRouting
    ],
    // providers
    providers: [
        AuthHttp,
        AuthService,
        CommentService,
        PostService,
        TopicService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }