export default class ProjectFile {
    constructor(
        public name: string,
        public path: string,
        public content: string,
        public id:string = Math.round(Math.random() * 1000000000).toString(),
    ) { }
}
