interface Product extends Base {
  name: string;
  description: string;
  price: number;
  discount?: number;
  mainImgUrl: string;
  carouselImgUrls: string[];
  amtLeft: number;
  featured: boolean;
  remarks?: string;
  category: Category;
}
