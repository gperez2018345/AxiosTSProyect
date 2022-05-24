/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

const BASE_URL = 'https://reqres.in/';

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const names = 'Andree';
  const jobs = 'TraeGuate';
  const [dataPost, setDataPost] = useState('');
  const [dataPut, setDataPut] = useState('');
  const [dataDelete, setDataDelete] = useState('');

  useEffect(() => {
    axios
      .get('https://reqres.in/api/users?page=2')
      .then(({data}) => {
        setData(data.data);
      })
      .catch(({error}) => console.log(error))
      .finally(() => setLoading(false));

    axios
      .post('https://reqres.in/api/users', {name: names, job: jobs})
      .then(({data}) => {
        setDataPost(
          `Registro de cuenta: Nombre: ${data.name}, Puesto: ${data.job}, Registro: ${data.createdAt}, ${data.id}`,
        );
      })
      .then(() => {
        console.log(dataPost);
      });

    axios
      .put('https://reqres.in/api/users/2', {name: 'Gerardo', job: 'LevelUp'})
      .then(({data}) => {
        setDataPut(
          `Registro Actualizado: Nombre:${data.name}, Puesto: ${data.job}, Actualizacion: ${data.updatedAt}`,
        );
      });

    axios.delete('https://reqres.in/api/users/2').then(() => {
      setDataDelete(`Registro Eliminado`);
    });
  }, []);

  return (
    <View>
      <View style={styles.contenedor}>
        <Text style={styles.text}>GET</Text>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Text style={styles.container}>
              Id: {item.id}, Nombre: {item.first_name}, Apellido:{' '}
              {item.last_name}, Email: {item.email}
            </Text>
          )}
        />
      </View>

      <View style={styles.contenedor}>
        <Text style={styles.text}>Post</Text>
        <Text>{dataPost}</Text>
      </View>

      <View style={styles.contenedor}>
        <Text style={styles.text}>Put</Text>
        <Text>{dataPut}</Text>
      </View>

      <View style={styles.contenedor}>
        <View>
          <Text style={styles.text}>Delete</Text>
          <Text>{dataDelete}</Text>
        </View>
      </View>
    </View>
  );
};

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  contenedor: {
    margin: 10,
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 3,
  },

  container: {
    margin: 10,
    alignItems: 'center',
    borderColor: '#000',
  },
  text: {
    fontSize: 24,
    justifyContent: 'center',
  },
});

export default App;
