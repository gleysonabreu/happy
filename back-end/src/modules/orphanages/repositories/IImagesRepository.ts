export default interface IImagesRepository {
  delete(_id: number): Promise<void>;
}
