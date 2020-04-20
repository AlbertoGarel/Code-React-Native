import {ADD_DATA} from '../actions';

const initialState = {
  dataFetch: [],
};

function february(state = initialState, action) {
  if (action.type === ADD_DATA) {
    console.log('state', state.dataFetch)
    return {...state, dataFetch: action.payload};
  } else {
    return state;
  }
};

export default february;
