const INITIAL_STATE = {
  categories: [],
  useFilters: false,
  resultDocuments: [],
};

const categoriesReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'SET_USE_FILTERS':
      return { ...state, useFilters: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_RESULT_DOCUMENTS':
      return { ...state, resultDocuments: action.payload };
    default:
      return state;
  }
};

export default categoriesReducer;
