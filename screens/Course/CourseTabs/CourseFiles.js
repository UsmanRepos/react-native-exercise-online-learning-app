import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, images, icons } from '../../../constants'
import { courseDetail } from '../../../utils'
import { TextButton, IconButton } from '../../../components'

const CourseFiles = () => {

    const renderStudents = () => {

        let students = []
        if (courseDetail?.students.length > 3) {
            students = courseDetail?.students.slice(0, 3)
        } else {
            students = courseDetail?.students
        };


        return (
            <View
                style={{
                    marginTop:SIZES.padding
                }}
            >
                {/* Title */}
                <Text style={{ ...FONTS.h2, fontSize: 25 }}>Students</Text>

                {/* Students */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.radius
                    }}
                >
                    {
                        students.map((item, index) => {
                            return (
                                <View
                                    key={`Students-${index}`}
                                    style={{
                                        marginLeft: index > 0 ? SIZES.radius : 0
                                    }}
                                >
                                    <Image
                                        source={item?.thumbnail}
                                        resizeMode='cover'
                                        style={{
                                            width: 80,
                                            height: 80
                                        }}
                                    />
                                </View>
                            );
                        })
                    }
                    {
                        students?.length > 3 &&
                        <TextButton
                            label={"View All"}
                            contentContainerStyle={{
                                backgroundColor: null,
                                flex: 1,
                            }}
                            labelStyle={{
                                color: COLORS.primary
                            }}
                        />
                    }
                </View>
            </View>
        );
    };

    const renderFiles = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                {/* Title */}
                <Text style={{ ...FONTS.h2, fontSize: 25 }}>Files</Text>

                {/* Files */}
                <View>
                    {
                        courseDetail?.files?.map((item, index) => {
                            return (
                                <View
                                    key={`Files-${index}`}
                                    style={{
                                        flexDirection: 'row',
                                        marginTop:SIZES.radius
                                    }}
                                >
                                    {/* Thumbnail */}
                                    <Image 
                                        source={item?.thumbnail}
                                        resizeMode='cover'
                                        style={{
                                            width:80,
                                            height:80
                                        }}
                                    />

                                    {/* Name, Author & Date */}
                                    <View
                                        style={{
                                            flex:1,
                                            marginLeft:SIZES.radius
                                        }}
                                    >
                                        <Text style={{ ...FONTS.h2 }}>{item?.name}</Text>
                                        <Text style={{ color:COLORS.gray30, ...FONTS.body3}}>{item?.author}</Text>
                                        <Text style={{ ...FONTS.body4}}>{item?.upload_date}</Text>
                                    </View>

                                    {/* Menu Button */}
                                    <IconButton 
                                        icon={icons.menu}
                                        iconStyle={{
                                            tintColor:COLORS.black
                                        }}
                                        containerStyle={{
                                            alignItems:'center'
                                        }}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        );
    };

    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: SIZES.padding
            }}
        >
            {/* Students */}
            {renderStudents()}

            {/* Files */}
            {renderFiles()}
        </ScrollView>
    )
}

export default CourseFiles

const styles = StyleSheet.create({})