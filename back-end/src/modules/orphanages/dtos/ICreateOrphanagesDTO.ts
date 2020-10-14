export default interface ICreateOrphanagesDTO {
  name: string;
  longitude: number;
  latitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: {
    path: string;
  }[];
}
