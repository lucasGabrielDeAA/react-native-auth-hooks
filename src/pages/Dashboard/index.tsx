import React from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';

import {useAuth} from '../../contexts/auth';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

const Dashboard: React.FC = () => {
  const {user, signOut} = useAuth();

  console.log(user);

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.container}>
      <Text>{user?.name}</Text>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
};

export default Dashboard;
