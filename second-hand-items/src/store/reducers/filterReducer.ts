import { Filter } from '../models';

const INITIAL_STATE: Filter = {
  category: '',
  priceMax: Number.POSITIVE_INFINITY,
  priceMin: 0,
  includeShippingCost: true,
  isAuction: undefined,
};

const filterReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
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
