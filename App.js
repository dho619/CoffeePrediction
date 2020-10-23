import React, { useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';

import { replicate_to_the_backend } from './src/services/Network';
import Routes from './src/routes';

export default function App() {
  NetInfo.addEventListener(async state => {
    console.log('Connection type', state.type);
    if (state.isConnected && state.isInternetReachable) {
      await replicate_to_the_backend();
    }
    console.log('Is connected?', state.isConnected);
  });
  return (
    <Routes />
  );
}