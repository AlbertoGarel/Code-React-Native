import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';

export default function App() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://rithmi-frontend-test.s3-eu-west-1.amazonaws.com/samples.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    });

    return (
        <SafeAreaView style={styles.container}>
          {
            data.map((item, index)=>{
              return (
                  <Text>Numero: { index } => {item.date}</Text>
              )
            })
          }
            <Text>esto es una prueba</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
});
