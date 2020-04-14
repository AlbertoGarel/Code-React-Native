import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, View, SectionList, ActivityIndicator} from 'react-native';
import FontAwesome, {SolidIcons, RegularIcons, BrandIcons} from 'react-native-fontawesome';

export default function App() {

  //----------------------------------- AUXILIARY FUNCTIONS ----------------------------------------------

  let ordena = (listado) => {

    listado.sort((a, b) => Date.parse(a['date']) - Date.parse(b['date']));

    return listado;
  };

//PARA OBTENER EL FORMATO DE DÍA ESPECÍFICO    **** PARA USAR EN ELEMENTO DONDE SE MOSTRARÁ LA HORA *****
  let formatoHora = (itemKey) => {
    return itemKey.split('T')[1].substring(0, 5);
  }

//OBTENEMOS LA FECHA EN FORMATO DESADO    **** PARA USAR EN ELEMENTO DONDE SE MOSTRARÁ LA FECHA *****
  let diaSemana = (titleFecha) => {

    let dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    let fecha = titleFecha.split('T')[0].split('T')[0].split("-").reverse().join("/");
    let date = new Date(fecha);

    let fechaNum = date.getDate();
    let mes_name = date.getMonth();

    return dias[date.getDay()] + " " + fechaNum + " de " + meses[mes_name];

  };

  //--------------------------------- PREPARE DYNAMICVTITLES AND DYNAMIC DATA --------------------------------

  let setDatos = (data) => {
    let titles = [];
    for (let i = 0; i < Object.keys(data).length; i++) {
      let miObjeto = new Object();

      miObjeto.title = diaSemana(Object.keys(data)[i]);
      miObjeto.data = data[Object.keys(data)[i]];

      titles.push(miObjeto);

    }
    return titles;
  };

  //-------------------------------------------------- PRINCIPAL ----------------------------------------------

  const preparaDatos = (lista) => {

    // CLONAMOS EL ARRAY DE OBJETOS CON LOS DATOS    **** TRABAJAMOS CON ARRAY CLONADO PARA NO ALTERAR DATOS Y PODER RECURRIR A ELLOS DE NUEVO SIN NINGUNA LLAMADA AL SERVIDOR *****
    let objectClon = JSON.parse(JSON.stringify(lista));

    //SEPARAMOS HORA DE DATE Y CREAMOS CAMPO NUEVO PARA USAR COMO KEY PARA AGRUPAR FECHAS
    objectClon.map(item => {
      if (item.date) {
        item.fecha = item.date.split('T')[0].split("-").reverse().join("-");
      }
    });

    //ORDENAR POR DÍA Y FECHA
    ordena(objectClon);

    const newData = objectClon.reduce((arr, itemArray) => {

      //AGRUPAMOS POR FECHA
      (itemArray.fecha in arr) ? arr[itemArray.fecha].push(itemArray) : arr[itemArray.fecha] = [itemArray];
      return arr;

    }, {});

    return newData;
  }

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
