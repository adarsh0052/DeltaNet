// App.tsx
import React, { useEffect, useRef } from 'react';
import { AppState, AppStateStatus, StatusBar, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';

export default function App() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('DeltaNet Notice: App foregrounded. Sync valid.');
      }
      appState.current = nextAppState;
      console.log('DeltaNet AppState changed to:', appState.current);
    });
    return () => subscription.remove();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121214' }}>
          <StatusBar barStyle="light-content" backgroundColor="#121214" />
          <AppNavigator />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}