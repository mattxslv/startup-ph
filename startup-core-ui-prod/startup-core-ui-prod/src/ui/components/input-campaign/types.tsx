export type Section =
  | {
      type: 'RICHTEXT';
      content: string;
    }
  | {
      type: 'VIDEO';
      source: 'youtube' | 'custom';
      video_url?: string;
      thumbnail_url?: string;
    }
  | {
      type: 'IMAGE';
      banner_url?: string;
    };
