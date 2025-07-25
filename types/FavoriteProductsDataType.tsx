export type FavoriteProduct = {
  _id: string;
  user: string;
  product: {
    _id: string;
    name: string;
    type: 'indoor' | 'outdoor' | string;
    quantity: number;
    price: number;
    description: string;
    thumbnail: string;
    category: string; // category is just the category ID here
    stockStatus: 'inStock' | 'outOfStock' | string;
    productId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type FavoriteProductsResponse = {
  status: boolean;
  message: string;
  data: FavoriteProduct[];
};
