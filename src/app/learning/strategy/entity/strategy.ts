import { UserGroup } from "app/system/entity/user-group";
import { Site } from "app/system/entity/site";
import { StrategyCondition } from "app/learning/strategy/entity/strategy-condition";
import { StrategyConditionValue } from "app/learning/strategy/entity/strategy-condition-value";
import { User } from "app/system/entity/user";

export class Strategy {
id: number;
name: string;
userGroup: UserGroup;
site: Site;
description: string;
totalScore: number;
passScore: number;
type: string;
isDefault: boolean;
isTemplet: boolean;
createdBy: User;
createdDate: string;
conditions: StrategyCondition[];
conditionValues: StrategyConditionValue[];
}
