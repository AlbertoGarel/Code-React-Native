import React from 'react';
import Sectionlist from "./components/Sectionlist";
import {Provider} from 'react-redux';
import store from './redux/store';
import {addData} from './redux/actions';

(function callApi() {
  addData();
})();

export default function App() {
  return (
    <Provider store={store}>
      <Sectionlist/>
    </Provider>
  )
};

