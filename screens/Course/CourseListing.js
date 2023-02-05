import { Text, StyleSheet, View, FlatList, Image } from 'react-native';
import React, { useRef } from 'react';
import Animated, {
  interpolate, Extrapolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDelay, withTiming, runOnJS
} from 'react-native-reanimated'
import { SharedElement } from 'react-navigation-shared-element'
import { HorizontalCourseCard, IconButton, LineDivider, FilterModal } from '../../components'
import { coursesListTwo } from '../../utils'
import { COLORS, SIZES, FONTS, icons, images } from '../../constants'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const HEADER_HEIGHT = 250

const CourseListing = ({ navigation, route }) => {

  const { category, sharedElementPrefix } = route.params
  const headerSharedValue = useSharedValue(80)
  const scrollY = useSharedValue(0)
  const flatListRef = useRef()
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  });

  const filterModalSharedValue1 = useSharedValue(SIZES.height)
  const filterModalSharedValue2 = useSharedValue(SIZES.height)

  const renderHeader = () => {
    const inputRange = [0, HEADER_HEIGHT - 50]

    headerSharedValue.value = withDelay(650,
      withTiming(0, {
        duration: 650,
      })
    );

    const headerFadeAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1])
      }
    });

    const headerTranslateAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: headerSharedValue.value
          },
        ]
      }
    });

    const headerHideAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(scrollY.value, inputRange, [0, 200], Extrapolate.CLAMP)
          },
        ]
      }
    });

    const headerHeightAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(scrollY.value, inputRange, [HEADER_HEIGHT, 120], Extrapolate.CLAMP)
      }
    });

    const headerTitleShowAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(scrollY.value, inputRange, [50, 130], Extrapolate.CLAMP)
          }
        ]
      }
    })

    return (
      <Animated.View
        style={[{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          overflow: 'hidden',
          height: 250
        }, headerHeightAnimatedStyle]}
      >
        {/* Background Image */}
        <SharedElement
          id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}
        >
          <Image
            source={category?.thumbnail}
            resizeMode='cover'
            style={{
              width: "100%",
              height: "100%",
              borderBottomLeftRadius: 60
            }}
          />
        </SharedElement>

        {/* Title */}
        <Animated.View
          style={[{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -80
          }, headerTitleShowAnimatedStyle]}
        >
          <Text style={{ ...FONTS.h2, color: COLORS.white, textAlign: "center" }}>{category?.title}</Text>
        </Animated.View>

        <Animated.View
          style={[{
            position: 'absolute',
            bottom: 70,
            left: 30
          }, headerHideAnimatedStyle]}
        >
          <SharedElement
            id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
            style={[StyleSheet.absoluteFillObject]}
          >
            <Text style={{ ...FONTS.h1, color: COLORS.white, position: 'absolute' }}>{category?.title}</Text>
          </SharedElement>
        </Animated.View>

        {/* Back Button */}
        <Animated.View
          style={headerFadeAnimatedStyle}
        >
          <IconButton
            icon={icons.back}
            iconStyle={{
              tintColor: COLORS.black
            }}
            containerStyle={{
              position: 'absolute',
              top: 40,
              left: 20,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.white,
              borderRadius: 25,
            }}
            onPress={() => {
              if (scrollY.value > 0 && scrollY.value <= 200) {
                flatListRef.current?.scrollToOffset({
                  offset: 0,
                  animated: true
                })
                setTimeout(() => {
                  headerSharedValue.value = withTiming(80, {
                    duration: 500
                  },
                    () => {
                      runOnJS(navigation.goBack())
                    }
                  )
                }, 100)
              } else {
                navigation.goBack()
              }
            }}
          />
        </Animated.View>

        {/* Category Image */}
        <Animated.Image
          source={images.mobile_image}
          resizeMode='contain'
          style={[{
            position: 'absolute',
            right: 40,
            bottom: -40,
            width: 100,
            height: 200
          }, headerFadeAnimatedStyle,
            headerTranslateAnimatedStyle,
            headerHideAnimatedStyle]}
        />
      </Animated.View>
    );
  };

  const renderResults = () => {
    return (
      <AnimatedFlatList
        ref={flatListRef}
        data={coursesListTwo}
        keyExtractor={item => `Results-${item.id}`}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding
        }}
        onScroll={onScroll}
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: "row",
              alignItems: 'center',
              marginTop: 270,
              marginBottom: SIZES.base
            }}
          >
            {/* Results */}
            <Text style={{ ...FONTS.body3, flex: 1 }}>5,765 Results</Text>

            {/* Filter Button */}
            <IconButton
              icon={icons.filter}
              iconStyle={{
                width: 20,
                height: 20
              }}
              containerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                width: 40,
                height: 40,
                borderRadius: 10
              }}
              onPress={() => {
                filterModalSharedValue1.value = withTiming(0, {
                  duration: 100
                });

                filterModalSharedValue2.value = withDelay(100,
                  withTiming(0, {
                    duration: 500
                  })
                );
              }}
            />
          </View>
        )}
        renderItem={({ item, index }) => (
          <HorizontalCourseCard
            course={item}
            containerStyle={{
              marginTop: index == 0 ? SIZES.radius : SIZES.padding,
              marginBottom: SIZES.padding
            }}
            onPress={() => navigation.navigate("courseDetail", { selectedCourse: item })}
          />
        )}
        ItemSeparatorComponent={() => (
          <LineDivider
            lineStyle={{
              height: 1,
            }}
          />
        )}
      />
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white
      }}
    >
      {/* Results */}
      {renderResults()}

      {/* Header */}
      {renderHeader()}

      {/* Filter Modal */}
      <FilterModal
        filterModalSharedValue1={filterModalSharedValue1}
        filterModalSharedValue2={filterModalSharedValue2}
      />
    </View>
  );
};

export default CourseListing;

CourseListing.sharedElements = (route, otherRoute, showing) => {
  if (otherRoute.name === "dashborad") {
    const { category, sharedElementPrefix } = route.params;
    return [
      {
        id: `${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`
      },
      {
        id: `${sharedElementPrefix}-CategoryCard-Title-${category?.id}`
      }
    ]
  }
}

const styles = StyleSheet.create({});
