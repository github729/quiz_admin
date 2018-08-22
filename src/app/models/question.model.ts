class QuestionModel {
    constructor(
        public name: string,
        public option1:string,
        public option2: string,
        public option3:string,
        public option4: string,
        public answers: string,
        public chapterId?:number,
        public id?: number
    ) {}
}
class QuestionFormModel {
    constructor(
        public name : string,
        public option1:string,
        public option2: string,
        public option3:string,
        public option4: string,
        public answers: string,
        public chapterId?:number
    ){}
}

export { QuestionModel,QuestionFormModel}