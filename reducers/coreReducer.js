const initialState = {
    accessToken: 'token_init_abcdabcd',
};
  
// Redux: Counter Reducer
const coreReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ACCESS_TOKEN': {
        return {
          ...state,
          accessToken: action.token
        };
      }
      default: {
        return state;
      }
    }
};

export default coreReducer;