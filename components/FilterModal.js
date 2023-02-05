import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import Animated, {
    interpolate,
    useAnimatedStyle,
    withDelay,
    withTiming
} from 'react-native-reanimated'
import { TextButton, TwoPointSlider } from '../components'
import { COLORS, SIZES, FONTS, icons, constants } from '../constants'
import { } from '../utils'
import LineDivider from './LineDivider';

const ClassTypeOptions = ({ containerStyle, classType, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: 100,
                borderRadius: SIZES.radius,
                paddingHorizontal: SIZES.radius,
                backgroundColor: isSelected ? COLORS.primary3 : COLORS.additionalColor9,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image
                source={classType.icon}
                resizeMode='contain'
                style={{
                    width: 40,
                    height: 40,
                    tintColor: isSelected ? COLORS.white : COLORS.gray80
                }}
            />
            <Text style={{
                marginTop: SIZES.base,
                ...FONTS.h3,
                color: isSelected ? COLORS.white : COLORS.gray80
            }}
            >{classType?.label}</Text>
        </TouchableOpacity>
    );
};

const ClassLevelOption = ({ containerStyle, isSelected, isLastItem, classLevel, onPress }) => {
    return (
        <>
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    height: 50,
                    ...containerStyle
                }}
                onPress={onPress}
            >

                <Text style={{ ...FONTS.body3, flex: 1 }}>{classLevel?.label}</Text>
                <Image
                    source={isSelected ? icons.checkbox_on : icons.checkbox_off}
                    resizeMode='contain'
                    style={{
                        width: 20,
                        height: 20
                    }}
                />
            </TouchableOpacity>
            {!isLastItem &&
                <LineDivider
                    lineStyle={{
                        height: 1
                    }}
                />
            }
        </>
    )
}

const FilterModal = ({ filterModalSharedValue1, filterModalSharedValue2 }) => {

    const [selectedClassType, setSelectedClassType] = useState("")
    const [selectedClassLevel, setSelectedClassLevel] = useState("")
    const [selectedCreatedWithin, setSelectedCreatedWithin] = useState("")

    const filterModalContainerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(filterModalSharedValue1.value, [SIZES.height, 0], [0, 1]),
            transform: [
                {
                    translateY: filterModalSharedValue1.value
                },
            ]
        }
    });

    const filterModalBgAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(filterModalSharedValue2.value, [SIZES.height, 0], [0, 1])
        }
    });

    const filterModalContentAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(filterModalSharedValue2.value, [SIZES.height, 0], [0, 1]),
            transform: [
                {
                    translateY: filterModalSharedValue2.value
                },
            ]
        }
    });

    const renderFooter = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding,
                    height: 50,
                    marginBottom: 30
                }}
            >
                {/* Reset Button */}
                <TextButton
                    label="Reset"
                    contentContainerStyle={{
                        flex: 1,
                        borderRadius: SIZES.radius,
                        borderWidth: 1,
                        backgroundColor: null
                    }}
                    labelStyle={{
                        color: COLORS.black,
                        ...FONTS.h3
                    }}
                />
                {/* Apply Button */}
                <TextButton
                    label={"Apply"}
                    contentContainerStyle={{
                        flex: 1,
                        height:"100%",
                        marginLeft: SIZES.radius,
                        borderRadius: SIZES.radius,
                        borderWidth: 2,
                        borderColor: COLORS.primary,
                        backgroundColor: COLORS.primary
                    }}
                />

            </View>
        );
    };
    return (
        /* Main Container */
        < Animated.View
            style={[{
                position: 'absolute',
                bottom: 0,
                width: SIZES.width,
                height: SIZES.height
            }, filterModalContainerAnimatedStyle]}
        >
            {/* Background Container */}
            <Animated.View
                style={[{
                    flex: 1,
                    width: SIZES.width,
                    height: SIZES.height,
                    backgroundColor: COLORS.transparentBlack7
                }, filterModalBgAnimatedStyle]}
            >
                {/* Content Container */}
                <Animated.View
                    style={[{
                        position: 'absolute',
                        bottom: 0,
                        height: SIZES.height * 0.9,
                        width: SIZES.width,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: COLORS.white
                    }, filterModalContentAnimatedStyle]}
                >

                    {/* Header */}
                    <View
                        style={{
                            marginTop: SIZES.padding,
                            paddingHorizontal: SIZES.padding,
                            flexDirection: "row"
                        }}
                    >
                        <View
                            style={{
                                width: 60
                            }}
                        >
                        </View>

                        <Text style={{ flex: 1, textAlign: "center", ...FONTS.h1 }}>Filter</Text>

                        <TextButton
                            label={"Cancel"}
                            contentContainerStyle={{
                                width: 60,
                                backgroundColor: null
                            }}
                            labelStyle={{
                                color: COLORS.black,
                                ...FONTS.body3
                            }}
                            onPress={() => {
                                filterModalSharedValue2.value = withTiming(SIZES.height, {
                                    duration: 500
                                });

                                filterModalSharedValue1.value = withDelay(500,
                                    withTiming(SIZES.height, {
                                        duration: 100
                                    })
                                );
                            }}
                        />

                    </View>

                    {/* Content */}
                    <ScrollView
                        contentContainerStyle={{
                            paddingHorizontal: SIZES.padding,
                            paddingBottom: 50
                        }}
                    >
                        {/* Class Type */}
                        <View
                            style={{
                                marginTop: SIZES.radius
                            }}
                        >
                            <Text style={{ ...FONTS.h3 }}>Class Type</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: SIZES.radius
                                }}
                            >
                                {constants.class_types.map((item, index) => (
                                    <ClassTypeOptions
                                        key={`ClassType-${index}`}
                                        classType={item}
                                        containerStyle={{
                                            marginLeft: index == 0 ? 0 : SIZES.base
                                        }}
                                        isSelected={selectedClassType == item.id}
                                        onPress={() => setSelectedClassType(item.id)}
                                    />
                                ))}
                            </View>

                            {/* Class Level */}
                            <View
                                style={{
                                    marginTop: SIZES.padding
                                }}
                            >
                                <Text style={{ ...FONTS.h3 }}>Class Level</Text>
                                <View>
                                    {constants.class_levels.map((item, index) => (
                                        <ClassLevelOption
                                            key={`ClassLevel-${index}`}
                                            classLevel={item}
                                            isLastItem={index == constants.class_levels.length - 1}
                                            isSelected={selectedClassLevel == item.id}
                                            onPress={() => setSelectedClassLevel(item.id)}
                                        />
                                    ))}
                                </View>
                            </View>

                            {/* Created Within */}
                            <View
                                style={{
                                    marginTop: SIZES.radius
                                }}
                            >
                                <Text style={{ ...FONTS.h3 }}>Created Within</Text>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    {constants.created_within.map((item, index) => (
                                        <TextButton
                                            key={`CreatedWithin-${index}`}
                                            label={item?.label}
                                            contentContainerStyle={{
                                                height: 45,
                                                paddingHorizontal: SIZES.radius,
                                                marginLeft: index % 3 == 0 ? 0 : SIZES.radius,
                                                marginTop: SIZES.radius,
                                                borderRadius: SIZES.radius,
                                                borderColor: COLORS.gray20,
                                                borderWidth: 1,
                                                backgroundColor: item?.id == selectedCreatedWithin ? COLORS.primary3 : null
                                            }}
                                            labelStyle={{
                                                color: item?.id == selectedCreatedWithin ? COLORS.white : COLORS.black,
                                                ...FONTS.body4
                                            }}
                                            onPress={() => setSelectedCreatedWithin(item?.id)}
                                        />
                                    ))}
                                </View>
                            </View>
                        </View>

                        {/* Class Length */}
                        <View
                            style={{
                                marginTop: SIZES.padding
                            }}
                        >
                            <Text style={{ ...FONTS.h3 }}>Class Length</Text>
                            <View
                                style={{
                                    alignItems: 'center'
                                }}
                            >
                                <TwoPointSlider
                                    values={[20, 50]}
                                    min={15}
                                    max={60}
                                    postfix={"min"}
                                    onValuesChange={(values) => console.warn(values)}
                                />
                            </View>
                        </View>
                    </ScrollView>

                    {/* Footer */}
                    {renderFooter()}
                </Animated.View>
            </Animated.View>
        </Animated.View >
    );
};

export default FilterModal;

const styles = StyleSheet.create({});
