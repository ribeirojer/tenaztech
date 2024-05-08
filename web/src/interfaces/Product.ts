export interface IProduct {
  imageUrl: string;
  category: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  isNew?: boolean;
  rating?: number;
  stars?: any[];
  emptyStars?: any[];
}