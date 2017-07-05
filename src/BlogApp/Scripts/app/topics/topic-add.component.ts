import { Component, Output, EventEmitter } from "@angular/core";
import { TopicService } from "./topic.service";
import { Topic } from "./topic";
@Component({
    selector: "topic-add",
    template:
    `
        <input type="text" #name placeholder="Name..." />
        <button (click)="add(name.value); name.value = '';">Add topic</button>
    `
})

export class TopicAddComponent {
    @Output() onAdd: EventEmitter<Topic[]> = new EventEmitter<Topic[]>();

    constructor(private topicService: TopicService) { }

    add(name: string) {
        this.topicService.add(name)
            .subscribe(topics => this.onAdd.emit(topics));
    }
}