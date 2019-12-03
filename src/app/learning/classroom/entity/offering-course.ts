import { Forum } from './../../../forum/ordinary-forum/entity/forum';
import { Classroom } from './classroom';
import { Course } from './../../course/entity/course';

export class OfferingCourse {
    id?: number;
    course?: Course;
    offering?: Classroom;
    forum?: Forum;

    // 仅给表单用
    // sourceType?: 'REFERENCED' | 'COPIED' | 'ORIGINAL';
}
