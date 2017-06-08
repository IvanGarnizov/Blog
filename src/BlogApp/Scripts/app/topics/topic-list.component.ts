﻿import { Component, OnInit } from "@angular/core";
import { Topic } from "./topic";
import { TopicService } from "./topic.service";
import { Router } from "@angular/router";

@Component({
    template:
    `
        <ul>
            <li *ngFor="let topic of topics" (click)="select(topic.id)">{{topic.name}}</li>
        </ul>
    `
})

export class TopicListComponent {
    topics: Topic[]

    constructor(private topicService: TopicService, private router: Router) { }

    ngOnInit() {
        this.topicService.getAll()
            .subscribe(topics => this.topics = topics);
    }

    select(id: number) {
        this.router.navigate(["topics", id]);
    }
}