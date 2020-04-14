import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, View, SectionList, ActivityIndicator} from 'react-native';

export default function App() {

  //----------------------------------- AUXILIARY FUNCTIONS ----------------------------------------------
  let ordena = (listado) => {

    listado.sort((a, b) => Date.parse(a['date']) - Date.parse(b['date']))

    return listado;
  };

//PARA OBTENER EL FORMATO DE DÍA ESPECÍFICO    **** PARA USAR EN ELEMENTO DONDE SE MOSTRARÁ LA HORA *****
  let formatoHora = (itemKey) => {
    return itemKey.split('T')[1].substring(0, 5)
  }

//OBTENEMOS LA FECHA EN FORMATO DESADO    **** PARA USAR EN ELEMENTO DONDE SE MOSTRARÁ LA FECHA *****
  let diaSemana = (titleFecha) => {

    let dias = [ "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    let fecha = titleFecha.split('T')[0].split('T')[0].split("-").reverse().join("/")
    let date = new Date(fecha);

    let fechaNum = date.getDate();
    let mes_name = date.getMonth();

    return dias[date.getDay()] + " " + fechaNum + " de " + meses[mes_name];

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
      (itemArray.fecha in arr) ? arr[itemArray.fecha].push(itemArray) : arr[itemArray.fecha] = [itemArray]
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
        .then((json) => {setData(preparaDatos(json))})
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  });

// setTitulo(Object.keys(data));

  return (
      <SafeAreaView style={styles.container}>
        {isLoading ? <ActivityIndicator/> : (
            <SectionList
                sections={[
                  { title: diaSemana(Object.keys(data)[0]), data: data[Object.keys(data)[0]]},
                  { title: diaSemana(Object.keys(data)[1]), data: data[Object.keys(data)[1]]},
                  { title: diaSemana(Object.keys(data)[2]), data: data[Object.keys(data)[2]]},
                  { title: diaSemana(Object.keys(data)[3]), data: data[Object.keys(data)[3]]},
                  { title: diaSemana(Object.keys(data)[4]), data: data[Object.keys(data)[4]]},
                  { title: diaSemana(Object.keys(data)[5]), data: data[Object.keys(data)[5]]},
                  { title: diaSemana(Object.keys(data)[6]), data: data[Object.keys(data)[6]]},
                  { title: diaSemana(Object.keys(data)[7]), data: data[Object.keys(data)[7]]},
                  { title: diaSemana(Object.keys(data)[8]), data: data[Object.keys(data)[8]]},
                  { title: diaSemana(Object.keys(data)[9]), data: data[Object.keys(data)[9]]},
                  { title: diaSemana(Object.keys(data)[10]), data: data[Object.keys(data)[10]]},
                ]}
                renderItem={({item}) => (
                    <View>
                      <Text style={styles.items}>{item.date}</Text>
                    </View>
                )}
                renderSectionHeader={({section, index}) => (
                    <View>
                      <Text>{section.title}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        )}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  items: {
    color: '#000'
  }
});
