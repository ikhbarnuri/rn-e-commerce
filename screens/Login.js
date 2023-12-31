import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import BackBtn from '../components/BackBtn';
import styles from './login.style';
import Button from '../components/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Password must be at least 8 character').required('Required'),
  email: Yup.string().email('Provide a valid email address').required('Required'),
});

const Login = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecure, setObsecure] = useState(true);

  const invalidForm = () => {
    Alert.alert(
      'Invalid Form',
      'Please provide all required fields',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel'),
        },
        {
          text: 'Continue',
          onPress: () => console.log('continue'),
        },
      ],
    );
  };

  const login = async (values) => {
    console.log(values);

    try {
      const endpoint = 'https://rn-e-commerce.vercel.app/api/login';
      const response = await axios.post(endpoint, values);

      if (response.status === 200) {
        setResponseData(response.data);

        await AsyncStorage.setItem(`user${responseData._id}`, JSON.stringify(responseData));
        await AsyncStorage.setItem(`id`, JSON.stringify(responseData._id));
        navigation.replace('Bottom Navigation');
      } else {
        Alert.alert(
          'Error Logging In',
          'Please provide valid credentials',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('cancel'),
            },
            {
              text: 'Continue',
              onPress: () => console.log('continue'),
            },
          ],
        );
      }
    } catch (e) {
      Alert.alert(
        'Error Logging In',
        'Oops, Error logging in try again',
        [
          {
            text: 'Cancel',
            onPress: () => {
            },
          },
          {
            text: 'Continue',
            onPress: () => console.log('continue'),
          },
        ],
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require('../assets/images/bk.png')}
            style={styles.cover}
          />
          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldTouched, touched }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
                    <MaterialCommunityIcons
                      name={'email-outline'}
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder={'Enter email'}
                      onFocus={() => setFieldTouched('email')}
                      onBlur={() => setFieldTouched('email', '')}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      autoCapitalize={'none'}
                      autoComplete={'off'}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
                    <MaterialCommunityIcons
                      name={'lock-outline'}
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      secureTextEntry={obsecure}
                      placeholder={'Enter password'}
                      onFocus={() => setFieldTouched('password')}
                      onBlur={() => setFieldTouched('password', '')}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize={'none'}
                      autoComplete={'off'}
                      style={{ flex: 1 }}
                    />

                    <TouchableOpacity activeOpacity={0.6} onPress={() => setObsecure(!obsecure)}>
                      <MaterialCommunityIcons
                        name={obsecure ? 'eye-outline' : 'eye-off-outline'}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>

                <Button
                  loader={loader}
                  title={'L O G I N'}
                  onPress={isValid ? handleSubmit : invalidForm}
                  isValid={isValid} />

                <Text style={styles.registration} onPress={() => navigation.navigate('SignUp')}>Regisetr</Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
    ;
};

export default Login;