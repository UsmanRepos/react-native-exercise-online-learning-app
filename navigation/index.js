import { StyleSheet, Easing } from 'react-native';
import React from 'react';
import {NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import { MainLayout, CourseListing, CourseDetail } from '../screens'

// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// const stack = createNativeStackNavigator()
/* 
    react-navigation-shared-element Library Using Five Version
    of React Navigation.
*/
const stack = createSharedElementStackNavigator()
const options = {
    gestureEnabled: false,
    transitionSpec: {
        open: {
            animation: 'timing',
            config: { duration: 400, easing: Easing.inOut(Easing.ease) }
        },
        close: {
            animation: "timing",
            config: { duration: 400, easing: Easing.inOut(Easing.ease) }
        }
    },
    cardStyleInterpolator: ({ current: { progress } }) => {
        return {
            cardStyle: {
                opacity: progress
            }
        }
    },
}

const Stack = () => (
    <stack.Navigator
        screenOptions={{
            useNativeDriver:true,
            headerShown: false
        }}
        initialRouteName='dashboard'
        detachInactiveScreens={false}
    >
        <stack.Screen
            name='dashboard'
            component={MainLayout}
        />
        <stack.Screen
            name='courseListing'
            component={CourseListing}
            options={() => options}
        />
        <stack.Screen
            name='courseDetail'
            component={CourseDetail}
        />

    </stack.Navigator>
);

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
};

const Index = () => {
    return (
        <NavigationContainer theme={theme}>
            <Stack />
        </NavigationContainer>
    );
};

export default Index;

const styles = StyleSheet.create({});
