import Image from '../../typeorm/entities/Image';

export default {
  render(image: Image) {
    return {
      id: image.id,
      path: `${process.env.API_URL}/uploads/${image.path}`,
    };
  },
  renderMany(images: Image[]) {
    return images.map(image => this.render(image));
  },
};
