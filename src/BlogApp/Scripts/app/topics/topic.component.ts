import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Topic } from "./topic";
import { TopicService } from "./topic.service";

@Component({
    template:
    `
        <div *ngIf="topic">
            <h1>{{topic.name}}</h1>
            <ul>
                <li *ngFor="let post of topic.posts">{{post.title}}</li>
            </ul>
        </div >
    `
})

export class TopicComponent {
    topic: Topic

    constructor(private activatedRoute: ActivatedRoute, private topicService: TopicService) { }

    ngOnInit() {
        var id = this.activatedRoute.snapshot.params["id"];

        this.topicService.get(id)
            .subscribe(topic => this.topic = topic);
    }
}