class ChapterModel {
    constructor(
        public courseId:number,
        public name: string,
        public description:string,
        public total_qns:string,
        public duration:string,
        public status: string,
        public id?: number
    ) {}
}
class ChapterFormModel {
    constructor(
        public courseId:number,
        public name : string,
        public description:string,
        public total_qns:string,
        public duration:string,
        public status : string
    ){}
}

export { ChapterModel,ChapterFormModel}