export type User = {
  email: string;
  name: string;
  notes: any;
};
export type Note = {
  date: number;
  title: string;
  body: string;
  location: Location;
};
export type Location = {
  long: string;
  lat: string;
};
