import { ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { SIZES, COLORS, FONTS, icons, images } from '../../constants'
import { coursesListOne, categories, coursesListTwo } from '../../utils'
import { IconButton, TextButton, VerticalCourseCard, LineDivider, CategoryCard, HorizontalCourseCard } from '../../components'


const Section = ({ containerStyle, title, onPress, children }) => {
  return (
    <View
      style={containerStyle}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.padding
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h2 }}>{title}</Text>
        <TextButton
          contentContainerStyle={{
            backgroundColor: COLORS.primary,
            width: 80,
            borderRadius: 30
          }}
          label={"See All"}
          onPress={onPress}
        />
      </View>
      {children}
    </View>
  );
};

const Home = () => {

  const navigation = useNavigation()

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
          marginBottom: 10,
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
        }}
      >
        {/* Greeting */}
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.h2 }}>Hello, Cs Concepts!</Text>
          <Text style={{ ...FONTS.body3, color: COLORS.gray50 }}>Thursday, 3th Feb 2022</Text>
        </View>

        {/* Notification */}
        <IconButton
          icon={icons.notification}
          iconStyle={{ tintColor: COLORS.black }}
        />
      </View>
    );
  };

  const renderStartLearning = () => {
    return (
      <ImageBackground
        source={images.featured_bg_image}
        style={{
          alignItems: "flex-start",
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 15
        }}
        imageStyle={{
          borderRadius: SIZES.radius
        }}
      >
        {/* Info */}
        <View>
          <Text style={{ color: COLORS.white, ...FONTS.body2 }}>HOW TO</Text>
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Make your brand more visible with our checklist</Text>
          <Text style={{ marginTop: SIZES.radius, color: COLORS.white, ...FONTS.body4 }}>By Scott Usman</Text>
        </View>

        {/* Image */}
        <Image
          source={images.start_learning}
          style={{
            width: "100%",
            height: 110,
            marginTop: SIZES.padding
          }}
        />

        {/* Button */}
        <TextButton
          label="Start Learning"
          contentContainerStyle={{
            height: 40,
            borderRadius: 20,
            backgroundColor: COLORS.white,
            paddingHorizontal: SIZES.padding
          }}
          labelStyle={{
            color: COLORS.black
          }}
        />

      </ImageBackground>
    );
  };

  const renderCourses = () => {

    const renderItem = ({ item, index }) => {
      return (
        <VerticalCourseCard
          containerStyle={{
            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
            marginRight: index == coursesListOne.length - 1 ? SIZES.padding : 0
          }}
          course={item}
        />
      );
    };

    return (
      <FlatList
        horizontal
        data={coursesListOne}
        listKey='Courses'
        keyExtractor={item => `courses-${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.padding
        }}
        renderItem={renderItem}
      />
    );
  };

  const renderCategories = () => {
    return (
      <Section
        title={"Categories"}
      >
        <FlatList
          horizontal
          data={categories}
          listKey='Categories'
          keyExtractor={item => `Categories-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius
          }}
          renderItem={({ item, index }) => (
            <CategoryCard
              sharedElementPrefix={"home"}
              category={item}
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : SIZES.base,
                marginRight: index == categories.length - 1 ? SIZES.padding : 0
              }}
              onPress={() => navigation.navigate("courseListing", {
                category: item,
                sharedElementPrefix: "home"
              })}
            />
          )}
        />
      </Section>
    );
  };

  const renderPopularCourses = () => {
    return (
      <Section
        title={"Popular Courses"}
        containerStyle={{
          marginTop: 30
        }}
      >
        <FlatList
          data={coursesListTwo}
          listKey='PopularCourses'
          keyExtractor={item => `PopularCourse-${item.id}`}
          scrollEnabled={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.padding
          }}
          renderItem={({ item, index }) => (
            <HorizontalCourseCard
              course={item}
              containerStyle={{
                marginVertical: SIZES.padding,
                marginTop: index == 0 ? SIZES.radius : SIZES.padding
              }}
            />
          )}
          ItemSeparatorComponent={() => (
            <LineDivider
              lineStyle={{ height: 1 }}
            />
          )}
        />
      </Section>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white
      }}
    >
      {/* Header */}
      {renderHeader()}

      {/* Content */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Start Learning */}
        {renderStartLearning()}

        {/* Courses */}
        {renderCourses()}

        {/* Divider */}
        <LineDivider
          lineStyle={{
            marginVertical: SIZES.padding
          }}
        />

        {/* Categories */}
        {renderCategories()}

        {/* Popular Courses */}
        {renderPopularCourses()}
      </ScrollView>

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
