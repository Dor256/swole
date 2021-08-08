import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { User } from '../../common/api';
import { Link } from '../../common/components/Link';
import { Text, useThemeColor, View } from '../../common/components/Themed';
import { useAuth } from '../../hooks/useAuth';

export type ProfileProps = {
  user: Omit<User, 'password'>;
};

const LinkIcon = () => {
  const color = useThemeColor({}, 'danger');
  return (
    <Ionicons
      style={styles.logoutIcon}
      name="exit"
      size={30}
      color={color}
    />
  );
};

export const Profile: React.FC<ProfileProps> = ({ user }) =>  {
  const { logOut } = useAuth();
  const color = useThemeColor({}, 'danger');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.email}</Text>
      <Link
        icon={<LinkIcon />}
        style={styles.link}
        color={color}
        onPress={logOut}
      >
        Log Out
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  link: {
    marginTop: '10%'
  },
  logoutIcon: {
    marginTop: -7,
    marginRight: '2%'
  }
});
