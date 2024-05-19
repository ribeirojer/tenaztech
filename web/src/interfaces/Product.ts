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

export interface CartItem {
  id: number;
  slug: string;
  name?: string;
  price: number;
  quantity: number;
  image: string;
}
