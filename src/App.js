import React from 'react';
import {ScrollView} from 'react-native';
import Sectionlist from "./components/Sectionlist";
import Chart from "./components/Chart";
import {Provider} from 'react-redux';
import store from './redux/store';
import {addData} from './redux/actions';

(function callApi() {
  addData();
})();

export default function App() {
  return (
    <Provider store={store}>
      <ScrollView>
        <Chart />
        <Sectionlist />
      </ScrollView>
    </Provider>
  )
};

