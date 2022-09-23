import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import React, { FC, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomeTextInput from '../../components/CustomTextInput';
import {
  storeEmailId,
  storeFirstName,
  storeLastName,
  storeMobile,
  storeUserName,
  storeIsVerified,
  storeIsProfileComplete,
  storeProfileImage,
} from '../../reduxstore/userSlice';
import { storeFarmDescription, storeFarmID, storeFarmImages, storeFarmName } from '../../reduxstore/farmSlice';
import { windowHeight, windowWidth } from '../../media/css/common';
import { CallGetApi } from '../../utilites/Util';
import { storePondArray } from '../../reduxstore/pondSlice';
import { NavigationParamList } from '../../types/navigation';

const signInURL = 'http://103.127.146.20:4000/api/v1/account/login';
const profileURL = 'http://103.127.146.20:4000/api/v1/account/profile';

const fishLogo = '../../media/FishLogo.gif';
const logo = '../../media/AquaLogo.gif';
const glogo = '../../media/googleLogo.png';
type naviType = NativeStackNavigationProp<NavigationParamList, 'sign_in'>;

const SignIn: FC = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [isSignInError, setIsSignInError] = useState(false);

  const navigation = useNavigation<naviType>();
  const dispatch = useDispatch();

  const goToSignUp = () => {
    navigation.navigate('sign_up');
  };

  const toggle = () => {
    setIsSignInError(!signInError);
  };

  const resetState = () => {
    setEmailId('');
    setPassword('');
    setSignInError('');
    setIsSignInError(false);
  };

  const onForgotPassword = () => {};

  const onSubmit = async () => {
    let data;
    let profileImageUrl;
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailId, password: password }),
      };
      const response = await fetch(signInURL, requestOptions);
      data = await response.json();
      if (data.message || data.detail === 'CSRF Failed: CSRF token missing or incorrect.') {
        setIsSignInError(true);
        setSignInError('Incorrect Email or Password');
      } else {
        resetState();
        const profileCheck: any = await CallGetApi(profileURL, data.email);
        const profileData = profileCheck.data;
        if (profileData.company_name !== '') {
          profileImageUrl = profileData.image.replace('localhost', '103.127.146.20');
          dispatch(storeIsProfileComplete({ isProfileComplete: true }));
          dispatch(storeProfileImage({ profileImage: profileImageUrl }));
        }
        if (data.farm_id !== null) {
          const farmURL = 'http://103.127.146.20:4000/api/v1/farms/farmregist/' + data.farm_id + '/get-farm-summary/';
          const pondURL = 'http://103.127.146.20:4000/api/v1/farms/farmregist/' + data.farm_id + '/get-related-ponds/';
          const farmApicall: any = await CallGetApi(farmURL, data.email);
          const farmData = farmApicall.data.result;
          const temp = farmData.farm_images;
          const farmImageArray = temp.map((item: any) => {
            return item.image.replace('localhost', '103.127.146.20');
          });
          const pondApiCall: any = await CallGetApi(pondURL, data.email);
          if (pondApiCall.data.result.ponds !== null) {
            const pondData = pondApiCall.data.result.ponds;
            console.log('POND DATA', pondData);
            dispatch(storePondArray({ pondDataArray: pondData }));
          }
          dispatch(storeFarmName({ farmName: farmData.farm_name }));
          dispatch(storeFarmImages({ farmImages: farmImageArray }));
          dispatch(storeFarmID({ farmID: data.farm_id }));
          dispatch(storeFarmDescription({ farmDescription: farmData.description }));
        }
        dispatch(storeEmailId({ email: data.email }));
        dispatch(storeFirstName({ firstName: data.first_name }));
        dispatch(storeLastName({ lastName: data.last_name }));
        dispatch(storeMobile({ mobile: data.phone_no }));
        dispatch(storeUserName({ userName: data.username }));
        dispatch(storeIsVerified({ isVerified: data.is_verified }));

        navigation.navigate('new_user_landing');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.imageContainer}>
        <Image style={Styles.backImage1} source={require(fishLogo)} />
        <Image style={Styles.backImage2} source={require(fishLogo)} />
        <Image style={Styles.backImage3} source={require(fishLogo)} />
        <Image style={Styles.logo} source={require(logo)} />
      </View>
      <View style={Styles.subContainer}>
        <Text style={Styles.text}>LogIn</Text>
        <CustomeTextInput
          placeholder="Enter Email"
          onChangeText={(text) => setEmailId(text)}
          fieldWidth={0}
          errorMessage=""
          errorState={false}
          isPassword={false}
        />
        <CustomeTextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          fieldWidth={0}
          errorMessage={signInError}
          errorState={isSignInError}
          isPassword={true}
        />
        {
          <TouchableOpacity style={Styles.button} onPress={onSubmit}>
            <Text style={Styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        }
        <View style={Styles.googleContainer}>
          <Image style={Styles.glogo} source={require(glogo)} />
          <Text>Log In via Google</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={Styles.text}>New user?</Text>
          <TouchableOpacity onPress={goToSignUp}>
            <Text style={Styles.text}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onForgotPassword}>
          <Text>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000000',
  },
  subContainer: {
    alignItems: 'center',
    marginTop: windowHeight * 0.4,
    backgroundColor: '#ffffff',
    width: windowWidth,
    height: windowHeight,
    borderRadius: 20,
  },
  googleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    padding: 5,
    flexDirection: 'row',
  },
  text: {
    marginVertical: windowHeight * 0.03,
    color: '#000000',
  },
  buttonText: {
    color: '#ffffff',
  },
  imageContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: windowHeight * 1.3,
  },
  backImage1: {
    position: 'absolute',
    resizeMode: 'cover',
    opacity: 0.3,
    width: windowWidth,
    height: windowHeight * 0.9,
  },
  backImage2: {
    position: 'absolute',
    resizeMode: 'cover',
    opacity: 0.3,
    width: windowWidth,
    height: windowHeight * 0.6,
    top: windowHeight * 0.2,
  },
  backImage3: {
    position: 'absolute',
    resizeMode: 'cover',
    top: windowHeight * 0.33,
    opacity: 0.3,
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
  },
  logo: {
    position: 'absolute',
    resizeMode: 'contain',
    top: windowHeight * 0.425,
    height: windowHeight * 0.11,
    width: windowWidth,
    opacity: 1,
  },
  glogo: {
    resizeMode: 'contain',
    height: windowHeight * 0.05,
    width: windowWidth * 0.1,
    marginRight: 10,
  },
  button: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.28,
    marginVertical: windowHeight * 0.02,
    borderRadius: 10,
    backgroundColor: '#0059AB',
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    marginHorizontal: windowWidth * 0.01,
    backgroundColor: '#C5C7D0',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    marginVertical: windowHeight * 0.005,
    marginLeft: windowWidth * 0.03,
    marginRight: windowWidth * 0.01,
    textAlign: 'center',
    color: '#ffffff',
    flexShrink: 1,
  },
});
