import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Animated, Keyboard } from 'react-native';
import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { Video } from 'expo-av';
import { LineDivider, IconButton } from '../../components'
import { COLORS, SIZES, FONTS, icons, images, constants } from '../../constants'
import {CourseChapters, CourseFiles, CourseDiscussion} from '../../screens'
import { } from '../../utils'


const courseDetailTabs = constants.course_details_tabs.map((courseDetailTab) => {
    return {
        ...courseDetailTab,
        ref: createRef()
    }
});


const TabIndicator = ({ measureLayout, scrollX }) => {

    const inputRange = courseDetailTabs.map((_, i) => i * SIZES.width);
    const tabIndicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.width)
    });
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map( measure => measure.x)
    });

    return (
        <Animated.View
            style={{
                position: 'absolute',
                bottom: 0,
                width: tabIndicatorWidth,
                height: 4,
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.radius,
                transform:[
                    {
                        translateX,
                    }
                ]
            }}
        >

        </Animated.View>
    );
};

const Tabs = ({ scrollX, onTabPress }) => {

    const [measureLayout, setMeasureLayout] = useState([])
    const containerRef = useRef()

    useEffect(() => {
        let ml = []
        courseDetailTabs.forEach(courseDetailTab => {
            courseDetailTab?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    ml.push({
                        x, y, width, height
                    });

                    if (ml.length === courseDetailTabs.length) {
                        setMeasureLayout(ml)
                    }
                }
            );
        });
    }, [containerRef.current])

    return (
        <View
            ref={containerRef}
            style={{
                flex: 1,
                flexDirection: 'row'
            }}
        >
            {/* Tabs Indicator */}
            {measureLayout.length > 0 &&
                <TabIndicator
                    measureLayout={measureLayout}
                    scrollX={scrollX}
                />
            }
            {/* Tabs */}
            {courseDetailTabs.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={`Tab-${index}`}
                        ref={item.ref}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 15
                        }}
                        onPress={() =>{ 
                            Keyboard.dismiss()
                            onTabPress(index)
                        }}
                    >
                        <Text style={{ ...FONTS.h3, fontSize: SIZES.height > 800 ? 18 : 17 }}>{item.label}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    );
};

const CourseDetail = ({ navigation, route }) => {

    const { selectedCourse } = route.params
    const [playVideo, setPlayVideo] = useState(false)

    const flatListRef = useRef()
    const scrollX = useRef(new Animated.Value(0)).current

    const onTabPress = useCallback((tabIndex) => {
        flatListRef?.current?.scorllToOffset({
            offset: tabIndex * SIZES.width
        })
    });

    const renderHeader = () => {

        const renderHeaderComponents = () => {
            return (
                <>
                    {/* Back Button */}
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <IconButton
                            icon={icons.back}
                            iconStyle={{
                                tintColor: COLORS.black
                            }}
                            containerStyle={{
                                width: 40,
                                height: 40,
                                backgroundColor: COLORS.white,
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => navigation.goBack()}
                        />

                    </View>

                    {/* Shared & Favourite Button */}
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <IconButton
                            icon={icons.media}
                            containerStyle={{
                                width: 50,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        />

                        <IconButton
                            icon={icons.favourite_outline}
                            containerStyle={{
                                width: 50,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        />
                    </View>
                </>
            );
        };

        if (playVideo) {
            return (
                <View
                    style={{
                        height: 80,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        paddingHorizontal: SIZES.radius,
                        paddingBottom: SIZES.base,
                        backgroundColor: COLORS.black
                    }}
                >
                    {renderHeaderComponents()}
                </View>
            )
        } else {

            return (
                <View
                    style={{
                        position: 'absolute',
                        top: SIZES.height > 800 ? 40 : 30,
                        right: 0,
                        left: 0,
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        zIndex: 1
                    }}
                >
                    {renderHeaderComponents()}
                </View>
            )
        }
    };
    const renderVedioSection = () => {
        return (
            <View
                style={{
                    height: SIZES.height > 800 ? 220 : 200,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.gray90
                }}
            >
                {/* Thumbnail */}
                <ImageBackground
                    source={selectedCourse?.thumbnail}
                    resizeMode='cover'
                    style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {/* Play Button */}
                    <IconButton
                        icon={icons.play}
                        containerStyle={{
                            width: 55,
                            height: 55,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: SIZES.padding,
                            borderRadius: 30,
                            backgroundColor: COLORS.primary
                        }}
                        onPress={() => setPlayVideo(true)}
                    />
                </ImageBackground>
                {playVideo &&
                    <Video
                        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                        style={{
                            position: 'absolute',
                            top: 0, bottom: 0,
                            left: 0, right: 0,
                            backgroundColor: COLORS.black
                        }}
                        useNativeControls
                        isLooping
                        resizeMode='cover'
                    />
                }
            </View>
        );
    };

    const renderContent = () => {
        return (
            <View style={{ flex: 1 }}>

                {/* Tabs */}
                <View
                    style={{
                        height: 60,

                    }}
                >
                    <Tabs
                        scrollX={scrollX}
                        onTabPress={onTabPress}
                    />
                </View>

                {/* Line Divider */}
                <LineDivider />

                {/* Content */}
                <View>
                    <Animated.FlatList
                        ref={flatListRef}
                        horizontal
                        pagingEnabled
                        snapToAlignment={'center'}
                        snapToInterval={SIZES.width}
                        showsHorizontalScrollIndicator={false}
                        keyboardDismissMode='on-drag'
                        keyExtractor={item => `CourseDetailTabs-${item.id}`}
                        decelerationRate='fast'
                        data={constants.course_details_tabs}
                        onScroll={Animated.event([
                            { nativeEvent: { contentOffset: { x: scrollX } } }
                        ], { useNativeDriver: false })}
                        renderItem={({ item, index }) => {
                            return (
                                <View
                                    style={{
                                        width: SIZES.width
                                    }}
                                >
                                    {index == 0 && <CourseChapters />}
                                    {index == 1 && <CourseFiles />}
                                    {index == 2 && <CourseDiscussion />}
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        );
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Header Bar */}
            {renderHeader()}

            {/* Vedio Section */}
            {renderVedioSection()}

            {/* Content */}
            {renderContent()}
        </View>
    );
};

export default CourseDetail;

const styles = StyleSheet.create({});
