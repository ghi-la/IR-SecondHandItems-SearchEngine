const INITIAL_STATE = {
  categories: [],
  resultDocuments: [],
};

const categoriesReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_RESULT_DOCUMENTS':
      return { ...state, resultDocuments: action.payload };
    default:
      return state;
  }
};

export default categoriesReducer;
