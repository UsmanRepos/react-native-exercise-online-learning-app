import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';
import React from 'react';
import { HorizontalCourseCard, IconLabel, LineDivider, ProgressBar, TextButton } from '../../../components'
import { COLORS, FONTS, SIZES, images, icons } from '../../../constants'
import { courseDetail, coursesListTwo } from '../../../utils'


const CourseChapters = () => {

    const renderHeader = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/* Title */}
                <Text style={{ ...FONTS.h2 }}>{courseDetail?.title}</Text>

                {/* Students & Duration */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.base
                    }}
                >
                    <Text style={{ ...FONTS.body4, color: COLORS.gray30 }}>{courseDetail?.number_of_students}</Text>
                    <IconLabel
                        icon={icons.time}
                        label={courseDetail?.duration}
                        iconStyle={{
                            width: 15,
                            height: 15
                        }}
                        labelStyle={{
                            ...FONTS.body4
                        }}
                        containerStyle={{
                            marginLeft: SIZES.radius
                        }}
                    />
                </View>

                {/* Instructor */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius
                    }}
                >
                    {/* Profile Photo */}
                    <Image
                        source={images.profile}
                        resizeMode='contain'
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25
                        }}
                    />

                    {/* Name & Title */}
                    <View
                        style={{
                            flex: 1,
                            marginLeft: SIZES.base,
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{ ...FONTS.h3, fontSize: 18 }}>{courseDetail?.instructor?.name}</Text>
                        <Text style={{ ...FONTS.body3, color: COLORS.gray30 }}>{courseDetail?.instructor?.title}</Text>
                    </View>

                    {/* Text Button */}
                    <TextButton
                        label={"Follow +"}
                        contentContainerStyle={{
                            width: 80,
                            height: 35,
                            borderRadius: 20
                        }}

                    />
                </View>

            </View>
        );
    };

    const renderChapters = () => {
        return (
            <View>
                {courseDetail?.videos.map((item, index) => {
                    return (
                        <View
                            key={`Videos-${index}`}
                            style={{
                                height: 70,
                                alignItems: 'center',
                                backgroundColor: item?.is_playing ? COLORS.additionalColor11 : null
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: SIZES.padding,
                                    height: "100%"
                                }}
                            >
                                {/* Icon */}
                                <Image
                                    source={item?.is_complete ? icons.completed : item?.is_playing ? icons.play_1 : icons.lock}
                                    resizeMode='contain'
                                    style={{
                                        width: 40,
                                        height: 40
                                    }}
                                />

                                {/* Title & Duration */}
                                <View
                                    style={{
                                        flex: 1,
                                        marginLeft: SIZES.radius
                                    }}
                                >
                                    <Text style={{ ...FONTS.h3 }}>{item?.title}</Text>
                                    <Text style={{ color: COLORS.gray30, ...FONTS.body4 }}>{item?.duration}</Text>
                                </View>


                                {/* Size & Status */}
                                <View
                                    style={{
                                        flexDirection: 'row'
                                    }}
                                >
                                    {/* Size */}
                                    <Text style={{ color: COLORS.gray30, ...FONTS.body4 }}>{item?.size}</Text>

                                    {/* Status */}
                                    <Image
                                        source={item?.is_downloaded ? icons.completed : icons.download}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: item?.is_lock ? COLORS.additionalColor4 : COLORS.primary,
                                            marginLeft: SIZES.base
                                        }}
                                    />
                                </View>
                            </View>

                            {/* Progress Bar */}
                            {item?.is_playing &&
                                <ProgressBar
                                    containerStyle={{
                                        height: 5,
                                    }}
                                    progress={item?.progress}
                                />
                            }

                        </View>
                    )
                })}
            </View>
        );
    };

    renderPopularCourses = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                {/* Section Header */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    <Text style={{ ...FONTS.h2, flex: 1 }}>Popular Courses</Text>
                    <TextButton
                        label={"See All"}
                        contentContainerStyle={{
                            width: 80,
                            borderRadius: 30
                        }}
                    />
                </View>

                {/* Popular Courses List */}
                <FlatList
                    data={coursesListTwo}
                    scrollEnabled={false}
                    listKey="PopularCourses"
                    keyExtractor={item => `PopularCourses-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius,
                        paddingHorizontal: SIZES.padding
                    }}
                    renderItem={({ item, index }) => (
                        <HorizontalCourseCard
                            course={item}
                            containerStyle={{
                                marginBottom: SIZES.padding,
                                marginTop: index == 0 ? SIZES.radius : SIZES.padding
                            }}
                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <LineDivider
                            lineStyle={{
                                height: 1
                            }}
                        />
                    )}
                />
            </View>
        );
    };

    return (
        <ScrollView
            style={{

            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Line Divider */}
            <LineDivider
                lineStyle={{
                    height: 1,
                    marginVertical: SIZES.radius
                }}
            />

            {/* Chapters */}
            {renderChapters()}

            {/* Popular Courses */}
            {renderPopularCourses()}
        </ScrollView>
    );
};

export default CourseChapters;

const styles = StyleSheet.create({});
