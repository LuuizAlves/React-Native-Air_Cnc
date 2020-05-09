import React, { useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import api from '../services/api';

export default function SpotList( { tech } ){
    const [spots, setSpots] = useState([]);
    const [index, setIndex] = useState(0);
    const navigation = useNavigation();

    useEffect(()=>{
        async function loadSpots(){
            const response = await api.get('/spots', {
                params: { tech }
            })

            setSpots(response.data);
        }
        
        loadSpots();
    }, [])

    function handleSpot(id){
        navigation.navigate('Book', {id});
    }

    return(
        <View style={styles.container}>
            <Text style={styles.containerText}> Empresas que usam <Text style={styles.bold}> {tech}  </Text></Text>
            
            <Carousel
                style={styles.list}
                data={spots}
                sliderWidth={350}
                itemWidth={350}
                renderItem={({item}) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{uri: item.thumbnail_url}} />
                        <Text style={styles.company}> {item.company} </Text>
                        <Text style={styles.price}> {item.price ? `R$${item.price},00/dia` : 'GRATUITO'} </Text>
                        <TouchableOpacity onPress={() => handleSpot(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}> Solicitar reserva </Text>
                        </TouchableOpacity>
                    </View>
                )}
                onSnapToItem={(index) => setIndex(index)}
            />
            <Pagination 
                dotsLength={spots.length}
                activeDotIndex={index}
                dotStyle={{
                    width: 40,
                    height: 15,
                    borderRadius: 8,
                    backgroundColor: '#444'
                }}
                inactiveDotScale={{
                    backgroundColor: '#999'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                animatedDuration={0}
                animatedTension={0}
                delayPressInDot={0}
            />

            {/* 
                <FlatList
                style={styles.list}
                numColumns={1}
                data={spots}
                keyExtractor={ spot => spot._id }
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{uri: item.thumbnail_url}} />
                        <Text style={styles.company}> {item.company} </Text>
                        <Text style={styles.price}> {item.price ? `R$${item.price},00/dia` : 'GRATUITO'} </Text>
                        <TouchableOpacity onPress={() => handleSpot(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}> Solicitar reserva </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            */}            
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: {
        marginTop: 30,
        alignItems: 'center'
    },

    containerText: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },

    bold: {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal: 20
    },

    listItem: {
        marginRight: 15
    },

    thumbnail: {
        width: 300,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 2,
        alignSelf: 'center'
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        alignSelf: 'center'
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
        alignSelf: 'center',
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 5,
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#FFF'
    }
});