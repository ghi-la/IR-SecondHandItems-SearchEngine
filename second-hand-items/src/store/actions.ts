import { isAuction } from './models';

export const isLoading = () => ({
  type: 'IS_LOADING',
});
export const isLoaded = () => ({
  type: 'IS_LOADED',
});
export const openNotification = (payload: {
  severity: string;
  message: string;
}) => ({
  type: 'OPEN_NOTIFICATION',
  payload,
});
export const closeNotification = () => ({
  type: 'CLOSE_NOTIFICATION',
});

// ####### Filter Actions #######
export const setFilterCategories = (payload: string[]) => ({
  type: 'SET_FILTER_CATEGORIES',
  payload,
});
export const setFilterByPrice = (payload: boolean) => ({
  type: 'SET_FILTER_BY_PRICE',
  payload,
});
export const setPriceMax = (payload: number) => ({
  type: 'SET_PRICE_MAX',
  payload,
});
export const setPriceMin = (payload: number) => ({
  type: 'SET_PRICE_MIN',
  payload,
});
export const toggleIncludeShippingCost = () => ({
  type: 'TOGGLE_INCLUDE_SHIPPING_COST',
});
export const setAuction = (payload: isAuction) => ({
  type: 'SET_AUCTION',
  payload,
});

// ####### Documents Actions #######
export const setCategories = (payload: string[]) => ({
  type: 'SET_CATEGORIES',
  payload,
});
export const setResultDocuments = (payload: any) => ({
  type: 'SET_RESULT_DOCUMENTS',
  payload,
});
