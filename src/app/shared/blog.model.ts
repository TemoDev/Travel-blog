export class Blog {
    constructor(
        public title: string,
        public description: string,
        public bgImg: string | null,
        public Sections: {
            sectionTitle: string,
            sectionDesc: string,
            sectionImg: string | null,
        }[]
    ) {}
}