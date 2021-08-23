class Pictures {
  readonly base64: string;
  readonly caption?: string;
}

export class RoomsDto {
    readonly order: number;
    readonly menu: string;
    readonly title: string;
    readonly paragraphs: string[];
    readonly link: string;
    readonly pics: Pictures[];
}
