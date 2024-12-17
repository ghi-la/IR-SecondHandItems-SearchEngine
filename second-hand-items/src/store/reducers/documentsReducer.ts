const INITIAL_STATE = {
  categories: [],
  isSearching: false,
  resultDocuments: [],
};

const documentsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'TOGGLE_IS_SEARCHING':
      return { ...state, isSearching: !state.isSearching };
    // case 'SET_USE_FILTERS':
    //   return { ...state, useFilters: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_RESULT_DOCUMENTS':
      return { ...state, resultDocuments: action.payload };
    default:
      return state;
  }
};

export default documentsReducer;
