import { Component, OnInit } from "@angular/core";
import { Topic } from "./topic";
import { TopicService } from "./topic.service";
import { Router } from "@angular/router";

@Component({
    template:
    `
        <ul>
            <li *ngFor="let topic of topics">
                <div *ngIf="topicEdit && topicEdit.id == topic.id">
                    <input type="text" [(ngModel)]="topicEdit.name" />
                    <button (click)="edit()">Edit</button>
                </div>
                <div *ngIf="!topicEdit || (topicEdit && topicEdit.id != topic.id)">
                    <div (click)="select(topic.id)">{{topic.name}}</div>
                    <button (click)="showEditBox(topic)">Edit</button>
                    <button (click)="delete(topic.id)">Delete</button>
                </div>
            </li>
        </ul>
        <topic-add (onAdd)="onAdd($event)"></topic-add>
    `
})

export class TopicListComponent {
    topics: Topic[];
    topicEdit: Topic;

    constructor(private topicService: TopicService, private router: Router) { }

    ngOnInit() {
        this.topicService.getAll()
            .subscribe(topics => this.topics = topics);
    }

    select(id: number) {
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