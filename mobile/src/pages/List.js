import React, { useState, useEffect } from 'react';
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {View, Image, AsyncStorage, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List(){
    const [techs, setTechs] = useState([]);
    const navigation = useNavigation();

    useEffect(()=>{
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    }, [])
    
    function navigateLogin(){
        AsyncStorage.clear();

        navigation.navigate('Login')
    }

    //{ techs.map(tech => <SpotList key={tech} tech={tech} />) }

    return (
        <SafeAreaProvider style={StyleSheet.container}>
            <SafeAreaView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={navigateLogin}>
                        <Feather name="arrow-left" size={28} color="#f05a5b" />
                    </TouchableOpacity>
                    <Image source={logo} style={styles.logo} />
                </View>
            </SafeAreaView>
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} /> )}
            </ScrollView>
        </SafeAreaProvider>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    
    header: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
    }
})