import { TopicReply } from './topicReply';
import { Forum } from './forum';
import { Topic } from './topic';
import { User } from 'app/system/entity/user';
import { Board } from './board';
export class Impeach {
    id: number;
    topic: Topic;
    replyId: number;
    state: string;
    targetType: string;
    forum: Forum;
    board: Board;
    reason: string;
    createdByUsername: string; // 举报者
    createdByDisplayName: string; // 举报者
    userUsername: string; // 被举报者
    userDisplayName: string; // 被举报者
    createdDate: string;
}
