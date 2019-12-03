import { NoticeBox } from './notice-box';
import { DocumentInfo } from '../../../library/entity/document-info';
/**
 * Notice
 */
export class Notice {
    id: string;
    title: string;
    content: string;
    isPublished: boolean;
    createdByFirstName: string;
    createdByDate: string;
    lastModifiedDate: string;
    noticeBox: NoticeBox;
    attachements: DocumentInfo[];
}
