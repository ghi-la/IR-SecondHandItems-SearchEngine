import {
  Document,
  Filter,
  InputDocument,
  isAuction,
  ParsedCluster,
} from '@/store/models';

export const parseDocument = (doc: InputDocument): Document => {
  const currency = doc.price.match(/[^\d.-]+/)?.[0] || '';

  return {
    docno: doc.docno,
    category: doc.category,
    subcategory: doc.subcategory,
    isAuction: doc.bestOffer ? true : false,
    imageURI: doc.imageURI,
    itemURI: doc.itemURI,
    price: parseFloat(doc.price.replace(/[^\d.-]+/g, '') || '0'),
    currency: currency,
    shippingCost: parseFloat(doc.shippingCost.match(/\d+\.?\d*/)?.[0] || '0'),
    title: doc.title,
  };
};

export const filterDocuments = (clusters: ParsedCluster[], filter: Filter) => {
  return clusters.filter((cluster) => {
    if (
      filter.clusters.length > 0 &&
      !filter.clusters.includes(cluster.label)
    ) {
      return false;
    }
    cluster.documents = cluster.documents.filter((doc) => {
      if (filter.filterByPrice) {
        if (filter.includeShippingCost) {
          if (
            filter.priceMax > 0 &&
            doc.price + doc.shippingCost > filter.priceMax
          ) {
            return false;
          }
        } else {
          if (filter.priceMax > 0 && doc.price > filter.priceMax) {
            return false;
          }
        }
      }
      if (filter.priceMin > 0 && doc.price < filter.priceMin) {
        return false;
      }
      if (doc.isAuction && filter.isAuction === isAuction.FIXED_PRICE) {
        return false;
      } else if (!doc.isAuction && filter.isAuction === isAuction.AUCTIONS) {
        return false;
      }
      return true;
    });
    return cluster.documents.length > 0;
  });
};