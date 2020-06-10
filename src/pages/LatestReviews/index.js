import React from 'react';
import { View, Text } from 'react-native'

import Header from '../../components/Header';

export default function LatestReviews({...props}) {
    return (
        <View style={{ flex: 1,}}>
            <Header {...props}/>
            <Text>Latest Reviews</Text>
        </View>
    )
}