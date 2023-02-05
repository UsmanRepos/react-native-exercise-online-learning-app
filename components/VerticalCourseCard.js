import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES, icons, FONTS } from '../constants';
import { IconLabel } from '../components'


const VerticalTourCard = ({ containerStyle, course }) => {
  return (
    <TouchableOpacity
      style={{
        width: 270,
        ...containerStyle
      }}
    >
      {/* Thumbnail */}
      <Image
        source={course.thumbnail}
        resizeMode='cover'
        style={{
          width: "100%",
          height: 150,
          marginBottom: SIZES.radius,
          borderRadius: SIZES.radius
        }}
      />

      {/* Details */}
      <View
        style={{ flexDirection: "row" }}
      >
        {/* Play Icon */}
        <View
          style={{
            width: 45,
            height: 45,
            borderRadius: 25,
            backgroundColor: COLORS.primary,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={icons.play}
            resizeMode='contain'
            style={{
              width: 20,
              height: 20
            }}
          />

        </View>
        {/* Info */}
        <View
          style={{
            flexShrink: 1,
            paddingHorizontal: SIZES.radius
          }}
        >
          <Text style={{ ...FONTS.h3, fontSize: 18, flex: 1 }}>{course.title}</Text>
          <IconLabel
            label={course.duration}
            icon={icons.time}
            containerStyle={{
              marginTop: SIZES.base
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalTourCard
