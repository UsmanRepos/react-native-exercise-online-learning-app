import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { IconButton, LineDivider, ProfileValue, ProgressBar, TextButton, ProfileRadioButton } from '../../components'
import { COLORS, FONTS, SIZES, icons, images } from '../../constants'
// import { } from '../../actions'
// import { connect } from 'react-redux'
import { toggleTheme } from '../../actions';
import {useSelector, useDispatch} from 'react-redux'

const Profile = () => {

  const {appTheme} = useSelector((state) => state.themeReducer)
  const dispatch = useDispatch()

  const [newCourseNotification, setNewCourseNotification] = useState(false)
  const [studyReminder, setStudyReminder] = useState(false)

  const toggleThemeHandler = () => {
    
    if (appTheme?.name == "light") {
      dispatch(toggleTheme("dark"))
    } else {
      dispatch(toggleTheme("light"))
    }
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 50,
          paddingHorizontal: SIZES.padding,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ ...FONTS.h1, color:appTheme?.textColor }}>Profile</Text>
        <IconButton
          icon={icons.sun}
          iconStyle={{ tintColor: appTheme?.tintColor }}
          onPress={() => toggleThemeHandler()}
        />
      </View>
    );
  };

  const renderProfileCard = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 20,
          borderRadius: SIZES.radius,
          backgroundColor: appTheme?.backgroundColor2
        }}
      >
        {/* Profile Image */}
        <TouchableOpacity
          style={{
            width: 80,
            height: 80
          }}
        >
          <Image
            source={images.profile}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 40,
              borderWidth: 1,
              borderColor: COLORS.white
            }}
          />

          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                marginBottom: -10,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                backgroundColor: COLORS.primary
              }}
            >
              <Image
                source={icons.camera}
                resizeMode='contain'
                style={{
                  width: 17,
                  height: 17
                }}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* Details */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            alignItems: "flex-start"
          }}
        >
          {/* Title */}
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Cs Concepts</Text>
          <Text style={{ color: COLORS.white, ...FONTS.body4 }}>Full Stack Developer</Text>

          {/* Progress */}
          <ProgressBar
            progress={"58%"}
            containerStyle={{
              marginTop: SIZES.radius
            }}
          />

          <View style={{ flexDirection: "row", width: "100%" }}>
            <Text style={{ flex: 1, color: COLORS.white, ...FONTS.body4 }}>Overall Progress</Text>
            <Text style={{ color: COLORS.white, ...FONTS.body4 }}>58%</Text>
          </View>

          {/* Member */}
          <TextButton
            label={"+ Become Member"}
            contentContainerStyle={{
              height: 35,
              marginTop: SIZES.padding,
              paddingHorizontal: SIZES.radius,
              borderRadius: 20,
              backgroundColor: appTheme?.backgroundColor4
            }}
            labelStyle={{
              color: appTheme?.textColor2
            }}
          />
        </View>
      </View>
    );
  };

  const renderProfileSectionOne = () => {
    return (
      <View style={styles.profileSectionContainer}>
        <ProfileValue
          icon={icons.profile}
          label={"Name"}
          value={"Cs Concepts"}
        />

        <LineDivider />
        <ProfileValue
          icon={icons.email}
          label={"Email"}
          value={"usman1002@gmail.com"}
        />

        <LineDivider />
        <ProfileValue
          icon={icons.password}
          label={"Password"}
          value={"Updated 2 Weeks Ago"}
        />

        <LineDivider />
        <ProfileValue
          icon={icons.call}
          label={"Contact Number"}
          value={"+92 315 2331002"}
        />

      </View>
    );
  };

  const renderProfileSectionTwo = () => {
    return (
      <View style={styles.profileSectionContainer}>

        <ProfileValue
          icon={icons.star_1}
          value={"Pages"}
        />

        <LineDivider />
        <ProfileRadioButton
          icon={icons.notification}
          label={"New Courses Notification"}
          isSelected={newCourseNotification}
          onPress={() => setNewCourseNotification(!newCourseNotification)}
        />

        <LineDivider />
        <ProfileRadioButton
          icon={icons.reminder}
          label={"Study Reminder"}
          isSelected={studyReminder}
          onPress={() => {
            console.warn("pressed")
            setStudyReminder(!studyReminder)
          }}
        />
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme?.backgroundColor1
      }}
    >
      {/* Header */}
      {renderHeader()}

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 150,
        }}
      >
        {/* Profile Card */}
        {renderProfileCard()}

        {/* Profile Section One */}
        {renderProfileSectionOne()}

        {/* Profile Section Two */}
        {renderProfileSectionTwo()}
      </ScrollView>
    </View>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     appTheme: state.appTheme,
//     error: state.error
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     toggleTheme: (themeType) => dispatch(toggleTheme(themeType))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;

const styles = StyleSheet.create({
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.gray20
  }
});
