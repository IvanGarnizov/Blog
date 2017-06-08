import { Post } from "./../posts/post";

export class Topic {
    constructor(
        public Id: number,
        public Name: string,
        public Posts: Post[]
    ) { }
}