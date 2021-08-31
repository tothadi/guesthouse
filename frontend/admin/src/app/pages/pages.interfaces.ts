export interface Section {
  title: string;
  paragraphs: string[];
}

export interface Picture {
  caption?: string;
  base64: Buffer;
}
