export interface Product {
  id: string;
  name: string;
  shopId: number;
  categoryId: number;
  isBought: boolean;
}

export interface Shop {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
} 