export type  ICourseCreateData = {
    title: string,
    code: string,
    credits: number,
    preRequisiteCourses: {
        courseId: string,
        isDeleted:boolean
    }[]
}

export type ICourseFilterRequest = {
    searchTerm?: string | undefined;
}
export type IPrerequisiteCourseRequest={
courseId :string;
isDeleted ?:null 
}