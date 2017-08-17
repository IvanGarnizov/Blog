import { Component, OnInit } from "@angular/core";
import { Topic } from "./topic";
import { TopicService } from "./topic.service";
import { Router } from "@angular/router";
import { AuthService } from "./../auth.service";

@Component({
    template:
    `
        <h1>Choose a topic!</h1>
        <ul class="topic-list">
            <li *ngFor="let topic of topics">
                <div *ngIf="topicEdit && topicEdit.id == topic.id">
                    <input type="text" [(ngModel)]="topicEdit.name" />
                    <button (click)="edit()">Edit</button>
                </div>
                <div *ngIf="!topicEdit || (topicEdit && topicEdit.id != topic.id)">
                    <a (click)="sendToTopic(topic.id)">{{topic.name}}</a>
                    <div class="buttons">
                        <button *ngIf="isAdmin" (click)="showEditBox(topic)">Edit</button>
                        <button *ngIf="isAdmin" (click)="delete(topic.id)">Delete</button>
                    </div>
                </div>
            </li>
        </ul>
        <topic-add *ngIf="isAdmin" (onAdd)="onAdd($event)"></topic-add>
    `
})

export class TopicListComponent {
    topics: Topic[];
    topicEdit: Topic;
    isAdmin: boolean;

    constructor(private topicService: TopicService, private router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.topicService.getAll()
            .subscribe(topics => this.topics = topics);

        if (this.authService.isLoggedIn()) {
            this.authService.isAdmin()
                .subscribe(isAdmin => this.isAdmin = isAdmin);
        }
    }

    sendToTopic(id: number) {
        this.router.navigate(["topics", id]);
    }

    delete(id: number) {
        this.topicService.delete(id)
            .subscribe(topics => this.topics = topics);
    }

    onAdd(topics: Topic[]) {
        this.topics = topics;
    }

    showEditBox(topic: Topic) {
        this.topicEdit = topic;
    }

    edit() {
        this.topicService.edit(this.topicEdit)
            .subscribe(topics => { this.topics = topics; this.topicEdit = null; });
    }
}