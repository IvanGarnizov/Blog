///<reference path="../../typings/index.d.ts"/>
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import "rxjs/Rx";

import { AboutComponent } from "./about.component";
import { AppComponent } from "./app.component";
import { CommentAddComponent } from "./comments/comment-add.component";
import { CommentListComponent } from "./comments/comment-list.component";
import { CommentReplyComponent } from "./comments/comment-reply.component";
import { HomeComponent } from "./home.component";
import { UserPostsComponent } from "./users/user-posts.component";
import { PostAddComponent } from "./posts/post-add.component";
import { PostComponent } from "./posts/post.component";
import { PostEditComponent } from "./posts/post-edit.component";
import { PostListComponent } from "./posts/post-list.component";
import { TopicAddComponent } from "./topics/topic-add.component";
import { TopicComponent } from "./topics/topic.component";
import { TopicListComponent } from "./topics/topic-list.component";
import { TopicSelectComponent } from "./topics/topic-select.component";

import { AppRouting } from "./app.routing";

import { CommentService } from "./comments/comment.service";
import { PostService } from "./posts/post.service";
import { UserService } from "./users/user.service";
import { TopicService } from "./topics/topic.service";

@NgModule({
    // directives, components, and pipes
    declarations: [
        AboutComponent,
        AppComponent,
        CommentAddComponent,
        CommentListComponent,
        CommentReplyComponent,
        HomeComponent,
        PostAddComponent,
        PostComponent,
        PostEditComponent,
        PostListComponent,
        UserPostsComponent,
        TopicAddComponent,
        TopicComponent,
        TopicListComponent,
        TopicSelectComponent
    ],
    // modules
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule,
        FormsModule,
        AppRouting
    ],
    // providers
    providers: [
        CommentService,
        PostService,
        UserService,
        TopicService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }