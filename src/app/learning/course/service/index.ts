import { DocumentInfoService } from './../../../library/service/documentInfo.service';
import { CourseTeacherService } from './course-teacher.service';
import { CourseOutlineService } from './course-outline.service';
import { RcoService } from './rco.service';
import { CourseService } from './course.service';
import { TrainingClassTbcbaseService } from "../../../training/training-class/service/training-class-tbcbase.service";
import { TrainingClassApiService } from '../../../training/service/training-class-api.service'
import { TrainingClassGroupService } from 'app/training/service/training-class-group.service';
import { CourseTrialService } from './course-trial.service';
import { OfferingCourseApiService } from './offering-course-api.service';

export const COURSE_API_SERVICES = [
    CourseService,
    RcoService,
    CourseOutlineService,
    CourseTeacherService,
    DocumentInfoService,
    TrainingClassGroupService,
    CourseTrialService,
    OfferingCourseApiService,
];
