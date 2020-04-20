import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, View, SectionList, ActivityIndicator} from 'react-native';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';
import {prepareData, setDataTitle, setFormatHour} from '../tools/tools';
import {connect} from 'react-redux';

function Sectionlist({februaryDataRdx}) {
  //----------------------------------- SET STATES (getters and setters)  -------------------------------------

  const [data, setData] = useState([]);

  //----------------------------------- receives props from redux  -------------------------------------

  useEffect(() => {
    setData(prepareData(februaryDataRdx));
  }, [februaryDataRdx]);

  //------------------------------ VIEW --------------------------------------------------------------------

  return (

      <SectionList
        style={styles.container}
        sections={
          setDataTitle(data)
        }
        renderItem={({item}) => (
          <View style={styles.contItems}>
            <Text style={styles.items}>{setFormatHour(item.date)}</Text>
            <Text style={styles.items}>{`${item.heartRate} ppm`}</Text>
            <Text style={(item.hasAnomaly) ? styles.normal : styles.warning}>
              <FontAwesome icon={SolidIcons.circle}/>
            </Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View>
            <Text style={styles.title}>{section.title}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />

  );
}

//--------------------------------------- STYLES -----------------------------------------------------

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    padding: 5,
    paddingTop: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginRight: 5,
    color: '#000',
  },
  contItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  items: {
    color: '#0B2940',
    fontSize: 20,
    padding: 7,
    textAlign: 'right',
  },
  warning: {
    fontSize: 20,
    padding: 7,
    color: '#ff0000',
  },
  normal: {
    fontSize: 20,
    padding: 7,
    color: '#777'
  }
});

const mapStateToProps = state => ({
  februaryDataRdx: state.february.dataFetch,
})

export default connect(mapStateToProps)(Sectionlist);
