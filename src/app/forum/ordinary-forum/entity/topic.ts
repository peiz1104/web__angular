import { User } from 'app/system/entity/user';
import { Forum } from './forum';
import { Board } from './board';
import { Title } from '@angular/platform-browser';
export class Topic {
    id: number;
    title: string;
    content: string;
    viewCount: number;
    replyCount: number;
    praiseCount: number;
    digCount: number;
    isLocked: boolean;   // 锁定
    isLight: boolean;    // 高亮
    isTop: boolean;      // 置顶
    isSuperior: boolean; // 精选
    isMicroTopic: boolean; // 是否是微话题
    hotValue: number;
    forum: Forum;
    boardId: number;
    boardName: string;
    topicType: string;

    createdByAvatar: string;
    createdByUsername: string;
    createdByDisplayName: string;
    createdDate: string;

    lastModifiedBy: User;
    lastModifiedByUsername: string;
    lastModifiedByDisplayName: string;
    lastModifiedDate: string;
}
