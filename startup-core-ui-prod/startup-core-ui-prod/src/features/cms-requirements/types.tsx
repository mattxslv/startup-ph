export type IRequirement = {
  id: string;
  code: string;
  name: string;
  description: string;
} & (
  | {
      type: 'INPUT';
      // add meta for input
    }
  | {
      type: 'FILE';
      // add meta for file
    }
);
