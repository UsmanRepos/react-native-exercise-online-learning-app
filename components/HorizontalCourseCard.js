import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { IconLabel } from '../components'
import { SIZES, COLORS, icons, FONTS } from '../constants'

const HorizontalCourseCard = ({ containerStyle, course, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        ...containerStyle
      }}
      onPress={onPress}
    >
      <ImageBackground
        source={course?.thumbnail}
        resizeMode='cover'
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-end",
          width: 130,
          height: 130,
          marginBottom: SIZES.radius
        }}
        imageStyle={{
          borderRadius: SIZES.radius
        }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            margin: 8,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.white,
            borderRadius: 5
          }}
        >
          <Image
            source={icons.favourite}
            resizeMode='contain'
            style={{
              width: 20,
              height: 20,
              tintColor: course.is_favourite ? COLORS.secondary : COLORS.additionalColor4
            }}
          />
        </View>
      </ImageBackground>

      {/* Details */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.base
        }}
      >
        {/* Title */}
        <Text style={{ ...FONTS.h3, fontSize: 18 }}>{course?.title}</Text>

        {/* Instructor & Duration */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.base
          }}
        >
          <Text style={{ ...FONTS.body4, color: COLORS.gray30 }}>By {course?.instructor}</Text>
          <IconLabel
            icon={icons.time}
            label={course?.duration}
            containerStyle={{
              marginLeft: SIZES.base
            }}
            iconStyle={{
              width: 15,
              height: 15
            }}
            labelStyle={{
              ...FONTS.body4
            }}
          />
        </View>

        {/* Prices & Rating */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.base
          }}
        >
          {/* Price */}
          <Text style={{ ...FONTS.h2, color: COLORS.primary }}>${course?.price.toFixed(2)}</Text>

          {/* Rating */}
          <IconLabel
            icon={icons.star}
            label={course?.ratings}
            containerStyle={{
              marginLeft: SIZES.base
            }}
            iconStyle={{
              width: 15,
              height: 15,
              tintColor: COLORS.primary2
            }}
            labelStyle={{
              marginLeft: 5,
              color: COLORS.black,
              ...FONTS.h3
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalCourseCard;
