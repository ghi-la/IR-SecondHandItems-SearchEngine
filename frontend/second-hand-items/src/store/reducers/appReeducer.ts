const INITIAL_STATE = {
  notification: {
    isOpen: false,
    severity: 'success',
    message: '',
  },
  isLoading: false,
};

const appReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'IS_LOADING':
      return { ...state, isLoading: true };
    case 'IS_LOADED':
      return { ...state, isLoading: false };
    case 'OPEN_NOTIFICATION':
      return {
        ...state,
        notification: {
          isOpen: true,
          severity: action.payload.severity,
          message: action.payload.message,
        },
      };
    case 'CLOSE_NOTIFICATION':
      return {
        ...state,
        notification: {
          ...state.notification,
          isOpen: false,
        },
      };
    default:
      return state;
  }
};

export default appReducer;
