import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import styles from './profile.style';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants';
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parseData = JSON.parse(currentUser);
        setUserData(parseData);
        setUserLogin(true);
      } else {
        navigation.navigate('Login');
      }
    } catch (e) {
      console.log('Error retrieving the data:', e);
    }
  };

  const userLogout = async () => {
    const id = await AsyncStorage.getItem('id');
    const userId = `user${JSON.parse(id)}`;

    try {
      await AsyncStorage.multiRemove([userId, 'id']);
      console.log('logout');
      navigation.navigate('Bottom Navigation');
    } catch (e) {
      console.log('Error retrieving the data:', e);
    }
  };

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel pressed'),
        },
        {
          text: 'Continue',
          onPress: userLogout,
        },
      ],
    );
  };

  const clearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to logout',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel pressed'),
        },
        {
          text: 'Continue',
          onPress: () => console.log('continue pressed'),
        },
      ],
      { defaultIndex: 1 },
    );
  };

  const deleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to logout',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel pressed'),
        },
        {
          text: 'Continue',
          onPress: () => console.log('continue pressed'),
        },
      ],
      { defaultIndex: 1 },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ width: '100%' }}>
            <Image source={require('../assets/images/space.jpg')} style={styles.cover} />
          </View>

          <View style={styles.profileContainer}>
            <Image source={require('../assets/images/profile.jpeg')} style={styles.profile} />
            <Text style={styles.name}>
              {userLogin === true ? userData.username : 'Please login into your account'}
            </Text>

            {userLogin === false ? (
              <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Login')}>
                <View style={styles.loginBtn}>
                  <Text style={styles.menuText}>LOGIN</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>{userData.email}</Text>
              </View>
            )}

            {userLogin === false ? (
              <View></View>
            ) : (
              <View style={styles.menuWrapper}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Favorites')}>
                  <View style={styles.menuItem(0.3)}>
                    <MaterialCommunityIcons
                      name={'heart-outline'}
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Favorites</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Orders')}>
                  <View style={styles.menuItem(0.3)}>
                    <MaterialCommunityIcons
                      name={'truck-delivery-outline'}
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Orders</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Cart')}>
                  <View style={styles.menuItem(0.3)}>
                    <SimpleLineIcons
                      name={'bag'}
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Cart</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} onPress={clearCache}>
                  <View style={styles.menuItem(0.3)}>
                    <MaterialCommunityIcons
                      name={'cached'}
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Clear cache</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} onPress={deleteAccount}>
                  <View style={styles.menuItem(0.3)}>
                    <AntDesign
                      name={'deleteuser'}
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Delete Account</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} onPress={logout}>
                  <View style={styles.menuItem(0.3)}>
                    <AntDesign
                      name={'logout'}
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Logout</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;