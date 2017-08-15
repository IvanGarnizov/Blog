import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutComponent } from "./about.component";
import { HomeComponent } from "./home.component";
import { LoginComponent } from "./login.component";
import { PostAddComponent } from "./posts/post-add.component";
import { PostComponent } from "./posts/post.component";
import { PostEditComponent } from "./posts/post-edit.component";
import { TopicComponent } from "./topics/topic.component";
import { TopicListComponent } from "./topics/topic-list.component";
import { UserPostsComponent } from "./users/user-posts.component";
import { RegisterComponent } from "./register.component";

const appRoutes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "home",
        redirectTo: ""
    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "posts/add",
        component: PostAddComponent
    },
    {
        path: "posts/my",
        component: UserPostsComponent
    },
    {
        path: "posts/:id",
        component: PostComponent
    },
    {
        path: "topics",
        component: TopicListComponent
    },
    {
        path: "topics/:id",
        component: TopicComponent
    },
    {
        path: "posts/:id/edit",
        component: PostEditComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "**",
        redirectTo: ""
    }
];

export const AppRoutingProviders: any[] = [];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);