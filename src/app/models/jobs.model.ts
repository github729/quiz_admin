class JobsModel {
    constructor(
        public jtiltle: string,
        public jpostdate:string,
        public jcname:string,
        public jlocation:string,
        public jrole: string,
        public jeligibility: string,
        public jlastdate:string,
        public cwebsite:string,
        public jexp:string,
        public jcprofile: string,
        public jdescription: string,
        public candidateprofile:string,
        public requiredskills:string,
        public jurl:string,
        public jtype:string,
        public jclogo?: string,
        public id?: number
    ) {}
}
class JobsFormModel {
    constructor(
        public jtiltle: string,
        public jpostdate:string,
        public jcname:string,
        public jlocation:string,
        public jrole: string,
        public jeligibility: string,
        public jlastdate:string,
        public cwebsite:string,
        public jexp:string,
        public jcprofile: string,
        public jdescription: string,
        public candidateprofile:string,
        public requiredskills:string,
        public jurl:string,
        public jtype:string,
        public jclogo?: string
    ){}
}

export { JobsModel,JobsFormModel }