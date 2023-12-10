import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import BackBtn from '../components/BackBtn';
import styles from './login.style';
import Button from '../components/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants';

const validationSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Password must be at least 8 character').required('Required'),
  email: Yup.string().email('Provide a valid email address').required('Required'),
  location: Yup.string().min(3, 'Provide a valid address').required('Required'),
  username: Yup.string().min(3, 'Provide a valid username').required('Required'),
});

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

const SignUp = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecure, setObsecure] = useState(true);


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
            onSubmit={(values) => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, setFieldTouched, touched }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Username</Text>
                  <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
                    <MaterialCommunityIcons
                      name={'face-man-profile'}
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder={'Enter username'}
                      onFocus={() => setFieldTouched('username')}
                      onBlur={() => setFieldTouched('username', '')}
                      value={values.username}
                      onChangeText={handleChange('username')}
                      autoCapitalize={'none'}
                      autoComplete={'off'}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.username && errors.username && (
                    <Text style={styles.errorMessage}>{errors.username}</Text>
                  )}
                </View>

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
                  <Text style={styles.label}>Location</Text>
                  <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
                    <Ionicons
                      name={'location'}
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      secureTextEntry={obsecure}
                      placeholder={'Enter location'}
                      onFocus={() => setFieldTouched('location')}
                      onBlur={() => setFieldTouched('location', '')}
                      value={values.location}
                      onChangeText={handleChange('location')}
                      autoCapitalize={'none'}
                      autoComplete={'off'}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.location && errors.location && (
                    <Text style={styles.errorMessage}>{errors.location}</Text>
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
                  title={'S I G N U P'}
                  onPress={isValid ? handleSubmit : invalidForm}
                  isValid={isValid}
                  loader={loader}
                />

                <Text style={styles.registration} onPress={() => navigation.navigate('Login')}>Login</Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;