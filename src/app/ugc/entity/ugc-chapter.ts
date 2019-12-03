import { UgcCourse } from "./ugc-course";

export type UgcChapterType = 'AUDIO' | 'VIDEO' | 'AUTO' ;

export class UgcChapter {
    id: number;
    title: string;
    intro: string;
    type: UgcChapterType;
    imageUrl: string;
    course: UgcCourse;
    startingUrl: string;
    zipFileName: string;
    fullPath: string;

    enterFileName: string;
    duration: number;

    digest: string;
    fileSize: number;
    createdDate: Date;
    childSeq: number;

    contentType: string;
    children?: UgcChapter[];

}
