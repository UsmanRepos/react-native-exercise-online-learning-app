import { StyleSheet, Text, View, Image, Keyboard, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, FONTS, icons } from '../../../constants'
import { IconButton, IconLabelButton } from '../../../components'
import { courseDetail } from '../../../utils'


const CommentSection = ({ commentItem, commentOptions, replies }) => {

    return (
        <View
            style={{
                flexDirection: 'row',
                marginTop: SIZES.padding
            }}
        >

            {/* Profile Image */}
            <Image
                source={commentItem?.profile}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20
                }}
            />

            {/* Name & Comment */}
            <View
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius,
                    marginTop: 3
                }}
            >
                {/* Name */}
                <Text style={{ ...FONTS.h3 }}>{commentItem?.name}</Text>

                {/* Comment */}
                <Text style={{ ...FONTS.body4 }}>{commentItem?.comment}</Text>

                {/* Comment Options */}
                {commentOptions}


                {/* Replies Section */}
                {replies}
            </View>
        </View>
    );
};

const CourseDiscussion = () => {

    const [footerPosition, setFooterPosition] = useState(60)
    const [footerHeight, setFooterHeight] = useState(60)
    const [newComment, setNewComment] = useState("")

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardWillShow",
            (e) => {
                setFooterPosition(e.endCoordinates.height)
            }
        );

        const hideSubscription = Keyboard.addListener("keyboardWillHide",
            (e) => {
                setFooterPosition(0)
            }
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };

    }, []);

    const renderDiscussion = () => {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <FlatList
                    data={courseDetail?.discussions}
                    listKey={"DiscussionsMain"}
                    keyExtractor={item => `Discussions-main-${item.id}`}
                    contentContainerStyle={{
                        paddingHorizontal: SIZES.padding,
                        paddingBottom: 70
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <CommentSection
                                commentItem={item}
                                commentOptions={
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: SIZES.radius,
                                            paddingVertical: SIZES.base,
                                            borderTopWidth: 1,
                                            borderBottomWidth: 1,
                                            borderColor: COLORS.gray20
                                        }}
                                    >
                                        {/* Comment */}
                                        <IconLabelButton
                                            icon={icons.comment}
                                            label={item?.no_of_comments}
                                            containerStyle={{
                                                paddingVertical: 0,
                                                paddingHorizontal: 0
                                            }}
                                            labelStyle={{
                                                marginLeft: 5,
                                                ...FONTS.h4
                                            }}
                                            iconStyle={{
                                                tintColor: COLORS.black
                                            }}

                                        />

                                        {/* Like */}
                                        <IconLabelButton
                                            icon={icons.heart}
                                            label={item?.no_of_likes}
                                            labelStyle={{
                                                marginLeft: 5,
                                                ...FONTS.h4
                                            }}
                                            containerStyle={{
                                                marginLeft: SIZES.radius
                                            }}

                                        />

                                        {/* Date */}
                                        <Text
                                            style={{
                                                flex: 1,
                                                textAlign: 'right',
                                                ...FONTS.h4
                                            }}
                                        >{item?.posted_on}</Text>
                                    </View>
                                }
                                replies={
                                    <FlatList
                                        data={item?.replies}
                                        scrollEnabled={false}
                                        keyExtractor={item => `Discussions-replies-${item.id}`}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <CommentSection
                                                    commentItem={item}
                                                    commentOptions={
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                marginTop: SIZES.radius,
                                                                paddingVertical: SIZES.base,
                                                                borderTopWidth: 1,
                                                                borderBottomWidth: 1,
                                                                borderColor: COLORS.gray20
                                                            }}
                                                        >
                                                            {/* Reply */}
                                                            <IconLabelButton
                                                                icon={icons.reply}
                                                                label={"Reply"}
                                                                labelStyle={{
                                                                    marginLeft: 5,
                                                                    ...FONTS.h4
                                                                }}

                                                            />

                                                            {/* Like */}
                                                            <IconLabelButton
                                                                icon={icons.heart_off}
                                                                label={"Like"}
                                                                containerStyle={{
                                                                    marginLeft: SIZES.radius
                                                                }}
                                                                labelStyle={{
                                                                    marginLeft: 5,
                                                                    ...FONTS.h4
                                                                }}
                                                            />

                                                            {/* Date */}
                                                            <Text
                                                                style={{
                                                                    flex: 1,
                                                                    textAlign: 'right',
                                                                    ...FONTS.h4
                                                                }}
                                                            >{item?.posted_on}</Text>
                                                        </View>
                                                    }
                                                />
                                            )
                                        }}
                                    />
                                }
                            />
                        )
                    }}
                />
            </View>
        );
    };

    const renderFooterTextInput = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: footerPosition,
                    right: 0,
                    left: 0,
                    height: footerHeight,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.radius,
                    backgroundColor: COLORS.gray10
                }}
            >
                <TextInput
                    multiline
                    style={{
                        flex: 1,
                        marginRight: SIZES.base,
                        ...FONTS.body3
                    }}
                    value={newComment}
                    onChangeText={ text => setNewComment(text)}
                    placeholder="Type Something"
                    placeholderTextColor={COLORS.gray80}
                    onContentSizeChange={(event) => {
                        const height = event.nativeEvent.contentSize.height

                        if (height <= 60) {
                            setFooterHeight(60)
                        } else if (height <= 100) {
                            setFooterHeight(height)
                        } else {
                            setFooterHeight(100)
                        }
                    }}
                />
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <IconButton
                        icon={icons.send}
                        iconStyle={{
                            tintColor: COLORS.primary
                        }}
                        onPress={() => {
                            setNewComment("")
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
            {/* Discussion */}
            {renderDiscussion()}

            {/* Footer */}
            {renderFooterTextInput()}
        </View>
    )
}

export default CourseDiscussion

const styles = StyleSheet.create({})