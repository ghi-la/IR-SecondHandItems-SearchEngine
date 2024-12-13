import { Document, InputDocument } from '@/store/models';

export const parseDocument = (doc: InputDocument): Document => {
  const currency = doc.price.match(/[^\d.-]+/)?.[0] || '';

  return {
    docno: doc.docno,
    category: doc.category,
    subcategory: doc.subcategory,
    isAuction: doc.bestOffer ? true : false,
    imageURI: doc.imageURI,
    itemURI: doc.itemURI,
    price: parseFloat(doc.price.match(/\d+\.?\d*/)?.[0] || '0'),
    currency: currency,
    shippingCost: parseFloat(doc.shippingCost.match(/\d+\.?\d*/)?.[0] || '0'),
    title: doc.title,
  };
};
