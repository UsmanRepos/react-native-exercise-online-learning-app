import { Image, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Shadow } from 'react-native-shadow-2'
import { FlatList } from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
import { CategoryCard, TextButton } from '../../components'
import { topSearches, categories } from '../../utils'

const Search = () => {

  const navigation = useNavigation()

  const scrollViewRef = useRef()
  const scrollY = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  });

  const renderTopSearches = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding
        }}
      >
        <Text style={{ marginHorizontal: SIZES.padding, ...FONTS.h2 }}>Top Searches</Text>
        <FlatList
          horizontal
          data={topSearches}
          listKey='TopSearches'
          keyExtractor={item => `TopSearches-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius
          }}
          renderItem={({ item, index }) => (
            <TextButton
              label={item.label}
              contentContainerStyle={{
                paddingVertical: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                marginRight: index == topSearches.length - 1 ? SIZES.padding : 0,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.gray10
              }}
              labelStyle={{
                color: COLORS.gray50,
                ...FONTS.h3
              }}
            />
          )}
        />
      </View>
    );
  };

  const renderBrowseCategories = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding
        }}
      >
        {/* Label */}
        <Text style={{ marginLeft: SIZES.padding, ...FONTS.h2 }}>Browse Categories</Text>

        {/* Categories */}
        <FlatList
          numColumns={2}
          scrollEnabled={false}
          data={categories}
          listKey='BrowseCategories'
          keyExtractor={item => `BrowseCategories-${item.id}`}
          contentContainerStyle={{
            marginTop: SIZES.radius
          }}
          renderItem={({ item, index }) => (
            <CategoryCard
              sharedElementPrefix={"search"}
              category={item}
              containerStyle={{
                height: 130,
                width: (SIZES.width - (SIZES.padding * 2) - SIZES.radius) / 2,
                marginLeft: (index + 1) % 2 == 0 ? SIZES.radius : SIZES.padding,
                marginTop: SIZES.radius
              }}
              onPress={() => navigation.navigate("courseListing", {
                category: item,
                sharedElementPrefix: "search"
              })}
            />
          )}
        />
      </View>
    );
  };

  const renderSearchBar = () => {

    const inputRange = [0, 55];

    const searchBarAnimatedStyle = useAnimatedStyle(() => {
      return ({
        height: interpolate(scrollY.value, inputRange, [55, 0], Extrapolate.CLAMP),
        opacity: interpolate(scrollY.value, inputRange, [1, 0], Extrapolate.CLAMP)
      });
    });

    return (
      <Animated.View
        style={[{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          paddingHorizontal: SIZES.padding,
          height: 50,
        }, searchBarAnimatedStyle]}
      >
        <Shadow>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              width: SIZES.width - (SIZES.padding * 2),
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white
            }}
          >
            <Image
              source={icons.search}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.gray40
              }}
            />
            <TextInput
              style={{
                flex: 1,
                marginLeft: SIZES.base,
                ...FONTS.h4
              }}
              value=''
              placeholder='Search for Topics, Courses & Educators'
              placeholderTextColor={COLORS.gray}
              selectionColor={COLORS.gray}
            />
          </View>
        </Shadow>
      </Animated.View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white
      }}
    >
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          marginTop: 100,
          paddingBottom: 300
        }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode={"on-drag"}
        onScroll={onScroll}
        onScrollEndDrag={(event) => {
          if (event.nativeEvent.contentOffset.y > 10 &&
            event.nativeEvent.contentOffset.y < 50) {
            scrollViewRef.current?.scrollTo({
              x: 0,
              y: 60,
              animated: true
            })
          }
        }}
      >
        {/* Top Searches */}
        {renderTopSearches()}

        {/* Browse Categories */}
        {renderBrowseCategories()}
      </Animated.ScrollView>

      {/* Search Bar */}
      {renderSearchBar()}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});