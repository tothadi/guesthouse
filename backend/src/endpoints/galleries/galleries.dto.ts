import { Picture } from "./galleries.interface";

export class PicturesDto {
    readonly filename?: string;
    readonly caption?: string;
}

export class GalleriesDto {
    readonly title: string;
    readonly folder: string;
    readonly text: string;
    readonly pics: Picture[];
}