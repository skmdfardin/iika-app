import React, { FC, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ActivityCard from '../../components/userComponenets/ActivityCard';
import UserBasicInfoCard from '../../components/userComponenets/UserBasicInfoCard';
import { EDIT_PROFILE_SCREEN, ADD_FARM } from '../../navigation/StackNavigation';
import { windowHeight, windowWidth, styles } from '../../media/css/common';

const { robotoBold16, robotoRegular13, robotoRegular16, robotoBold20 } = styles;

const fishBowl = '../../media/SplashSlider/undraw_fish_bowl_uu881.png';
const logo = '../../media/AquaLogo.gif';
const menu = '../../media/menu.png';

const NewUserLanding: FC = () => {
  const navigation = useNavigation();
  const store = useSelector((state: any) => state.userStore);

  const updateStatus = (temp: string): void => {
    console.log(temp);
    navigation.navigate(EDIT_PROFILE_SCREEN.toString());
  };

  const updateDummy = (temp: string): void => {
    console.log(temp);
    navigation.navigate(ADD_FARM.toString());
  };

  const onSubmit = () => {
    setStatus('Verified');
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <Image style={Styles.menu} source={require(menu)} />
        <Image style={Styles.logo} source={require(logo)} />
      </View>
      <UserBasicInfoCard />
      {!store.isProfileComplete ? (
        <View>
          <ActivityCard
            titleText="Wohoo! Your account has been successfully created."
            messageText="Now complete your Profile & Business registration!"
            buttonText="Complete your profile"
            updateStatus={updateStatus}
            buttonState={true}
          />
          <Image style={Styles.image} source={require(fishBowl)} />
        </View>
      ) : !store.isVerified ? (
        <View style={{ marginHorizontal: windowWidth * 0.01, padding: windowWidth * 0.005 }}>
          <View style={{ marginHorizontal: windowWidth * 0.01, padding: windowWidth * 0.005 }}>
            <Text style={[robotoBold20, { textAlign: 'center' }]}>
              Your business has been Successfully regestered.Please wait while we review your business details
            </Text>
          </View>

          <Image style={Styles.image} source={require(fishBowl)} />

          <View style={{ marginHorizontal: windowWidth * 0.01, padding: windowWidth * 0.005 }}>
            <Text style={[robotoRegular16, { textAlign: 'center' }]}>
              You will recive a email when your accounthas been verified and approved
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <View style={Styles.subTabContainer}>
            <View style={Styles.tabActive}>
              <Text style={Styles.tabTextActive}>Farms & Ponds</Text>
            </View>
            <View style={Styles.tabInactive}>
              <Text style={Styles.tabTextInactive}>Activity</Text>
            </View>
          </View>
          <ActivityCard
            titleText="Your Business has been successfully verified!"
            messageText="Let's start by creating a farm and adding the details"
            buttonText="Add Farm"
            updateStatus={updateDummy}
            buttonState={true}
          />
          <ActivityCard
            titleText="Wohoo! Your account has been successfully created."
            messageText="Now complete your Profile & Business registration!"
            buttonText="Complete your profile"
            updateStatus={updateStatus}
            buttonState={false}
          />
          <Image style={Styles.image} source={require(fishBowl)} />
        </View>
      )}
    </View>
  );
};

export default NewUserLanding;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth,
    height: windowHeight * 0.09,
    backgroundColor: '#000000',
  },
  logo: {
    resizeMode: 'contain',
    height: windowHeight * 0.09,
    width: windowWidth * 0.25,
  },
  menu: {
    resizeMode: 'contain',
    height: windowHeight * 0.08,
    width: windowWidth * 0.1,
    marginLeft: windowWidth * 0.04,
    marginTop: windowHeight * 0.005,
  },
  image: {
    marginHorizontal: windowWidth * 0.2,
    marginVertical: windowHeight * 0.01,
  },
  subTabContainer: {
    marginHorizontal: windowWidth * 0.02,
    marginVertical: windowHeight * 0.01,
    backgroundColor: '#000000',
    height: windowHeight * 0.06,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabTextInactive: {
    color: '#ffffff',
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#000000',
    textAlign: 'center',
  },
  tabActive: {
    backgroundColor: '#ffffff',
    height: windowHeight * 0.04,
    width: windowWidth * 0.42,
    paddingTop: windowHeight * 0.005,
    borderRadius: 5,
  },
  tabInactive: {
    backgroundColor: '#000000',
    height: windowHeight * 0.04,
    width: windowWidth * 0.42,
    paddingTop: windowHeight * 0.005,
    borderRadius: 5,
  },
});
