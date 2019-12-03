import { Course } from './course';

export class OnlineCourse extends Course {
    producer?: string;
    produceTime?: Date;
    isDownload?: boolean;
    isPreview?: boolean;
    previewTime?: number;
}
