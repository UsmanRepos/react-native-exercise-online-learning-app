import { Image, View, Text } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constants';

const IconLabel = ({ containerStyle, icon, iconStyle, label, labelStyle }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                ...containerStyle
            }}
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.gray30,
                    ...iconStyle
                }}
            />
            <Text
                style={{
                    ...FONTS.body3,
                    color: COLORS.gray30,
                    marginLeft: SIZES.base,
                    ...labelStyle
                }}
            >
                {label}
            </Text>
        </View>
    );
};

export default IconLabel;