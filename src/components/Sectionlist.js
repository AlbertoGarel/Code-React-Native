import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, View, SectionList, ActivityIndicator} from 'react-native';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';
import {preparaDatos, setDatos, ordena, formatoHora, diaSemana} from '../tools/tools'

function Sectionlist() {


  //----------------------------------- SET STATES (getters and setters)  -------------------------------------

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //----------------------------------- CALL TO END-POINT  -------------------------------------

  useEffect(() => {
    fetch('https://rithmi-frontend-test.s3-eu-west-1.amazonaws.com/samples.json')
      .then((response) => response.json())
      .then((json) => {
        setData(preparaDatos(json))
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  });


  //------------------------------ VIEW --------------------------------------------------------------------

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <SectionList
          style={styles.primero}
          sections={
            setDatos(data)
          }
          renderItem={({item}) => (
            <View style={styles.contItems}>
              <Text style={styles.items}>{formatoHora(item.date)}</Text>
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
      )}
    </SafeAreaView>
  );
}

//--------------------------------------- STYLES -----------------------------------------------------

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    padding: 5,
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

export default Sectionlist;
