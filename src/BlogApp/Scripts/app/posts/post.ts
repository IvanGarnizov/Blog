export class Post {
    constructor(
        public Id: number,
        public Title: string,
        public Content: string,
        public ViewsCount: number,
        public CreationTime: Date,
        public LastModified: Date
    ) { }
}