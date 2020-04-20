import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {setFormatHour, formatDate} from '../tools/tools';
import PureChart from 'react-native-pure-chart';
import {connect} from 'react-redux';

const Chart = ({februaryDataRdx}) => (
  <>
    <Text
      style={styles.title}>
      GRÁFICA DE FEBRERO
    </Text>
    <PureChart
      type={'line'}
      data={februaryDataRdx.map(item => {
        const chartData = {};
        chartData['x'] = `${formatDate(item.date)}\n${setFormatHour(item.date)} horas`;
        chartData['y'] = item.heartRate;
        return chartData;
      })}
      width={'100%'}
      height={250}
      customValueRenderer={(index, point) => {
        return <Text style={{textAlign: 'center'}}>{`${point.y} ppm`}</Text>;
      }}
    />
  </>
);

const styles = StyleSheet.create({
  title: {
    padding: 7,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#F5FCFF',
  },

});

const mapStateToProps = state => ({
  februaryDataRdx: state.february.dataFetch,
});

export default connect(mapStateToProps)(Chart);
