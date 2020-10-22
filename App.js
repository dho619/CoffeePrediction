import React from 'react';
import NetInfo from '@react-native-community/netinfo';

import Routes from './src/routes';

export default function App() {
  NetInfo.addEventListener(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });
  return (
    <Routes />
  );
}