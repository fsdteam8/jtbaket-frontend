export type Product = {
  _id: string;
  name: string;
  type: 'indoor' | 'outdoor' | string;
  quantity: number;
  price: number;
  description: string;
  thumbnail: string;
  category: {
    _id: string;
    name: string;
  };
  productId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isFavorited:boolean
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ProductResponse = {
  status: boolean;
  message: string;
  data: {
    products: Product[];
    pagination: Pagination;
  };
};
