import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Text, View } from 'react-native';
import Header from '../../components/Header';
import styles from './styles';

export default function Incidents({ navigation }) {

    useEffect(() => {
        let mounted = true;
        return () => mounted = false;
    }, []);

    const [places, setPlaces] = useState([
        {
            id: 1,
            title: 'Lagoinha',
            description: 'Lagoinha...',
            latitude: -20.9198338,
            longitude: -46.9834752,
        },
        {
            id: 2,
            title: 'Arena Olímpica',
            description: 'Quadra de esportes',
            latitude: -20.9146743,
            longitude: -46.9920948,
        },
        {
            id: 3,
            title: 'Atacadão',
            description: 'Luiz Tonin Atacadão',
            latitude: -20.9185789,
            longitude: -46.9778171,
        }
    ]);

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.mapArea}>
                <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: places[0].latitude,
                        longitude: places[0].longitude,
                        latitudeDelta: 0.0142,
                        longitudeDelta: 0.0231,
                    }}

                >
                    {places.map(place => (
                        <MapView.Marker
                            ref={mark => place.mark = mark}
                            title={place.title}
                            description={place.description}
                            key={place.id}
                            coordinate={{
                                latitude: place.latitude,
                                longitude: place.longitude,
                            }}
                        />
                    ))}
                </MapView>
            </View>
        </View>
    );
}
