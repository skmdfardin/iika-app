import React, { FC } from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ActivityCard from '../../components/userComponenets/ActivityCard';
import UserBasicInfoCard from '../../components/userComponenets/UserBasicInfoCard';
import HorizontalBigCardFarmInfo from '../../components/farmComponenets/HorizontalBigCardFarmInfo';
import PondCardArray from '../../components/pondComponenets/PondCardArray';
import { windowHeight, windowWidth, styles } from '../../media/css/common';
import { NavigationParamList } from '../../types/navigation';

type naviType = NativeStackNavigationProp<NavigationParamList, 'new_user_landing'>;

const { robotoRegular16, robotoBold20 } = styles;

const fishBowl = '../../media/SplashSlider/undraw_fish_bowl_uu881.png';
const logo = '../../media/AquaLogo.gif';
const menu = '../../media/menu.png';

const NewUserLanding: FC = () => {
  const navigation = useNavigation<naviType>();
  const store = useSelector((state: any) => state.userStore);
  const farmStore = useSelector((state: any) => state.farmStore);
  const farmID = farmStore.farmID;

  const updateStatus = (): void => {
    navigation.navigate('edit_profile_screen');
  };

  const updateDummy = (): void => {
    navigation.navigate('add_farm');
  };

  const goToAddPond = (): void => {
    navigation.navigate('add_pond');
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
            callBack={updateStatus}
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
      ) : farmID === '' ? (
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
            callBack={updateDummy}
            buttonState={true}
          />
          <ActivityCard
            titleText="Wohoo! Your account has been successfully created."
            messageText="Now complete your Profile & Business registration!"
            buttonText="Complete your profile"
            callBack={updateStatus}
            buttonState={false}
          />
          <Image style={Styles.image} source={require(fishBowl)} />
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
          <ScrollView style={{ marginBottom: windowHeight * 0.3 }} showsVerticalScrollIndicator={false}>
            <HorizontalBigCardFarmInfo />
            <PondCardArray />
            <ActivityCard
              titleText="Your Farm has been successfully created"
              messageText="Let's start by adding ponds to your farm"
              buttonText="Add Pond"
              callBack={goToAddPond}
              buttonState={true}
            />
          </ScrollView>
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
