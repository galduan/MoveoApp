export type User = {
  email: string;
  name: string;
  notes: Note[];
};
export type Note = {
  id:number
  date: string;
  title: string;
  body: string;
  location: string;
};
