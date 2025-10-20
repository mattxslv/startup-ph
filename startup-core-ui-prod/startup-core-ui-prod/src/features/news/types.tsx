import { Section } from 'ui/components/input-campaign/types';

export interface INews {
  id: string;
  title: string;
  sub_title: string;
  publish_date: string;
  publish_by: string;
  thumbnail_url: string;
  body: Array<Section>;
  tags: string[];
  is_published?: boolean;
  agency: string;
}
