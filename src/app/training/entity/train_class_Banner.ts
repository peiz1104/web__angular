import { Offering } from "app/learning/offering/entity/offering";


export class TrainClassBanner {
    id?: number;
    name?: string;
    imageUrl?: string;
    width?: number;
    height?: number;
    link?: string;
    backgroundColor?: string;
    enabled?: boolean;
    displayOrder?: number;
    offering?: Offering;
}
