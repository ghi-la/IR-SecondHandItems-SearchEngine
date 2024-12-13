export type InputDocument = {
  docno: string;
  category: string;
  subcategory: string;
  bestOffer: string;
  imageURI: string;
  itemURI: string;
  price: string;
  shippingCost: string;
  title: string;
};

export type Document = {
  docno: string;
  category: string;
  subcategory: string;
  isAuction: boolean;
  imageURI: string;
  itemURI: string;
  price: number;
  currency: string;
  shippingCost: number;
  title: string;
};

export type Filter = {
  category: string;
  priceMax: number;
  priceMin: number;
  includeShippingCost: boolean;
  isAuction: boolean | undefined;
};
