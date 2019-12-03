import { Course } from './course';

export class LiveCourse extends Course {
    playMode?: string;
    link?: string;
    organizerToken?: string;
    autoPlay?: boolean;
    opened?: boolean;
}
