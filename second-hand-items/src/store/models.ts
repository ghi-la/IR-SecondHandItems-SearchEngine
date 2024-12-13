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

export type DocumentsInfo = {
  categories: string[];
  priceMax: number;
};

export type Filter = {
  categories: string[];
  filterByPrice: boolean;
  priceMax: number;
  priceMin: number;
  includeShippingCost: boolean;
  isAuction: isAuction;
};

export enum isAuction {
  AUCTIONS = 'Only Auctions',
  FIXED_PRICE = 'Only Fixed Price',
  BOTH = 'Both auctions and fixed price',
}
    
