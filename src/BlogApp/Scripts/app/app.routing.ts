import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AddPostComponent } from "./posts/add-post.component";
import { AboutComponent } from "./about.component";
import { HomeComponent } from "./home.component";
import { PostComponent } from "./posts/post.component";
import { TopicComponent } from "./topics/topic.component";
import { TopicListComponent } from "./topics/topic-list.component";

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
        path: "posts/add",
        component: AddPostComponent
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
    }
];

export const AppRoutingProviders: any[] = [];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);