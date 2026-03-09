import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { Screen } from './src/navigation';
import {
  HomeScreen,
  AdminDashboardScreen,
  SupportScreen,
  CustomerHomeScreen,
  RiderHomeScreen,
  RestaurantScreen,
} from './src/screens';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const navigate = (screen: Screen) => setCurrentScreen(screen);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B00" />
      {currentScreen === 'home' && <HomeScreen navigate={navigate} />}
      {currentScreen === 'admin' && <AdminDashboardScreen navigate={navigate} />}
      {currentScreen === 'support' && <SupportScreen navigate={navigate} />}
      {currentScreen === 'customer' && <CustomerHomeScreen navigate={navigate} />}
      {currentScreen === 'rider' && <RiderHomeScreen navigate={navigate} />}
      {currentScreen === 'restaurant' && <RestaurantScreen navigate={navigate} />}
    </>
  );
};

export default App;
