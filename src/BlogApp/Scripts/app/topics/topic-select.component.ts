import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Topic } from "./topic";
import { TopicService } from "./topic.service";

@Component({
    selector: "topic-select",
    template:
    `
        <select (change)="selectChanged($event.target.value)">
            <option *ngFor="let topic of topics" [value]="topic.id">{{topic.name}}</option>
        </select>
    `
})

export class TopicSelectComponent {
    topics: Topic[]
    @Output() notify: EventEmitter<number> = new EventEmitter<number>()

    constructor(private topicService: TopicService) { }

    ngOnInit() {
        this.topicService.getAll()
            .subscribe(topics => this.topics = topics);
    }

    selectChanged(topicId: number) {
        this.notify.emit(topicId);
    }
}