import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute, useNavigation} from '@react-navigation/native';
import { Text, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, Alert} from 'react-native';

import api from '../services/api';

export default function Book(){
    const [data, setData] = useState('');
    const navigation = useNavigation();

    const route = useRoute();
    const id = route.params.id;

    async function HandleSubmit() {
        const user_id = AsyncStorage.getItem('user');
        console.log(user_id);

        await api.post(`/spots/${id}/bookings`, {
            data,
        }, {
            headers: user_id
        })

        Alert.alert('Solicitação Enviada', 'Aguarde a confirmação da Empresa.');

        navigation.navigate('List');
    };

    function HandleCancel(){
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}> DATA DE INTERESSE * </Text>
            <TextInput 
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={data}
                onChangeText={setData}
            />

            <TouchableOpacity onPress={HandleSubmit} style={styles.button}>
                <Text style={styles.buttonText}> Solicitar reserva </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={HandleCancel} style={[styles.button, styles.buttonCancel]}>
                <Text style={styles.buttonText}> Cancelar </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 20
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 5
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10
    },

    buttonCancel: {
        backgroundColor: '#ccc',
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF'
    }
});