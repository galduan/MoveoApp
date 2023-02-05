export type User = {
  email: string;
  name: string;
  notes: Note[];
};
export type Note = {
  date: string;
  title: string;
  body: string;
  location: string;
};
