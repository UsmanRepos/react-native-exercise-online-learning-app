import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import {useSelector} from 'react-redux' 

const ProfileValue = ({ icon, label, value, onPress }) => {
    const {appTheme} = useSelector((state) => state.themeReducer)
    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                height: 80,
                alignItems: "center"
            }}
            onPress={onPress}
        >
            {/* Icon */}
            <View
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: appTheme?.backgroundColor3
                }}
            >
                <Image
                    source={icon}
                    resizeMode='contain'
                    style={{
                        width:25,
                        height:25,
                        tintColor:COLORS.primary
                    }}
                />
            </View>

            {/* Label & Value */}
            <View
                style={{
                    flex:1,
                    marginLeft:SIZES.radius
                }}
            >
                { label && 
                    <Text style={{ color:COLORS.gray30, ...FONTS.body3}}>{label}</Text>
                }
                { value &&
                    <Text style={{ ...FONTS.h3, color:appTheme?.textColor}}>{value}</Text>
                }
            </View>

            {/* Right Arrow Icon */}
            <Image
                source={icons.right_arrow}
                resizeMode='contain'
                style={{
                    width:15,
                    height:15,
                    tintColor:appTheme?.tintColor
                }}
            />
        </TouchableOpacity>
    );
};

export default ProfileValue;
