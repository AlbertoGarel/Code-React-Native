import store from '../store';
import {setSortDates} from '../../tools/tools';
export const ADD_DATA = 'ADD_DATA';

export function addData() {
  fetch('https://rithmi-frontend-test.s3-eu-west-1.amazonaws.com/samples.json')
    .then(response => response.json())
    .then(json => {
      store.dispatch({type: ADD_DATA, payload: setSortDates(json)});
    })
    .catch(error => console.error(error));
}
