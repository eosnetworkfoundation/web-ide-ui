import type ProjectFile from "./ProjectFile.model";

export default class Project {
    constructor(
        public id: string,
        public name: string,
        public files: Array<ProjectFile>,
        public selectedFile: string,
        public openFiles: Array<string>,
        public createdAt: number = Date.now(),
    ) { }
}
