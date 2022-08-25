export class Blog {
    constructor(
        public createdAt: any,
        public title: string,
        public description: string,
        public bgImg: string | null,
        public Sections: {
            sectionTitle: string,
            sectionDesc: string,
            sectionImg: string | null,
        }[],
        public creator?: string,
        public blogId?: string,
        ) {}
}