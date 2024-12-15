import { Filter, isAuction } from '../models';

const INITIAL_STATE: Filter = {
  categories: [],
  filterByPrice: false,
  priceMax: Number.MAX_SAFE_INTEGER,
  priceMin: 0,
  includeShippingCost: true,
  isAuction: isAuction.BOTH,
};

const filterReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'SET_FILTER_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_FILTER_BY_PRICE':
      return { ...state, filterByPrice: action.payload };
    case 'SET_PRICE_MAX':
      return { ...state, priceMax: action.payload };
    case 'SET_PRICE_MIN':
      return { ...state, priceMin: action.payload };
    case 'TOGGLE_INCLUDE_SHIPPING_COST':
      return { ...state, includeShippingCost: !state.includeShippingCost };
    case 'SET_AUCTION':
      return { ...state, isAuction: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
