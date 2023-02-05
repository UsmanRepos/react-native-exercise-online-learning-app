import { View, Text, Animated, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { COLORS, SIZES, FONTS,  } from '../constants';
import {useSelector} from 'react-redux'

const ProfileRadioButton = ({ isSelected, icon, label, onPress }) => {

    const {appTheme} = useSelector((state) => state.themeReducer)
    const radioAnimated = useRef(new Animated.Value(0)).current

    const circleColorAnimated =  radioAnimated.interpolate({
        inputRange:[0,17],
        outputRange:[COLORS.gray40, COLORS.primary]
    });

    const lineColorAnimated = radioAnimated.interpolate({
        inputRange:[0, 17],
        outputRange:[COLORS.additionalColor4, COLORS.additionalColor13]
    });


    useEffect(() => {
        if (isSelected) {
            Animated.timing(radioAnimated, {
                toValue: 17,
                duration: 300,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(radioAnimated, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start();
        }
    }, [isSelected])
    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                height: 80,
                alignItems: "center"
            }}
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
                        width: 25,
                        height: 25,
                        tintColor: COLORS.primary
                    }}
                />
            </View>

            {/* Label */}
            <View
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius
                }}
            >
                {label &&
                    <Text style={{...FONTS.h3, color:appTheme?.textColor }}>{label}</Text>
                }
            </View>

            {/* Radio Button */}
            <TouchableOpacity
                style={{
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems:"center"
                }}
                onPress={onPress}
            >
                <Animated.View
                    style={{
                        width: "100%",
                        height: 5,
                        borderRadius: 3,
                        backgroundColor: lineColorAnimated,
                        justifyContent:"center"
                    }}
                >
                    <Animated.View
                        style={{
                            position: "absolute",
                            left: radioAnimated,
                            width: 25,
                            height: 25,
                            borderRadius: 15,
                            borderColor: circleColorAnimated,
                            borderWidth: 5,
                            backgroundColor: appTheme?.backgroundColor1
                        }}
                    ></Animated.View>
                </Animated.View>
            </TouchableOpacity>
        </TouchableOpacity>

    );
};

export default ProfileRadioButton;
