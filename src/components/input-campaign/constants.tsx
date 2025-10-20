import { Section } from "./types";

export const INIT_SECTION: Record<Section['type'], Section> = {
  RICHTEXT: {
    type: 'RICHTEXT',
    content: 'Untitled Textblock',
  },
  VIDEO: {
    type: 'VIDEO',
    source: 'custom',
    thumbnail_url: undefined,
    video_url: undefined,
  },
  IMAGE: {
    type: 'IMAGE',
    banner_url: undefined,
  }
}
