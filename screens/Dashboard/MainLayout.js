import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { createRef, useCallback, useRef, useState, useEffect } from 'react';
import { Shadow } from 'react-native-shadow-2';
import { useSelector } from 'react-redux'

import { SIZES, COLORS, FONTS, constants } from '../../constants';
import { Home, Profile, Search } from '../../screens';


const bottomTabs = constants.bottom_tabs.map((bottom_tab) => ({
	...bottom_tab,
	ref: createRef()
}));

const TabIndicator = ({ scrollX, measureLayout }) => {

	const inputRange = bottomTabs.map((_, i) => SIZES.width * i);

	const tabIndicatorWidth = scrollX.interpolate({
		inputRange,
		outputRange: measureLayout.map(measure => measure.width),
	});

	const translateX = scrollX.interpolate({
		inputRange,
		outputRange: measureLayout.map(measure => measure.x)
	});


	return (
		<Animated.View
			style={{
				position: "absolute",
				left: 0,  // decide to change later on
				height: "100%",
				width: tabIndicatorWidth,
				borderRadius: SIZES.radius,
				backgroundColor: COLORS.primary,
				transform: [
					{
						translateX
					}
				]
			}}
		/>
	)
}

const Tabs = ({ scrollX, onTabPress }) => {

	const [measureLayout, setMeasureLayout] = useState([]);
	const containerRef = useRef();


	useEffect(() => {
		let ml = []
		bottomTabs.forEach(bottomTab => {
			bottomTab?.ref?.current?.measureLayout(
				containerRef.current,
				(x, y, width, height) => {
					ml.push({
						x, y, width, height
					});

					if (ml.length == bottomTabs.length) {
						setMeasureLayout(ml)
					}
				}
			);
		});
	}, [containerRef.current]);

	return (
		<View
			ref={containerRef}
			style={{
				flex: 1,
				flexDirection: "row"
			}}
		>
			{/* Tab Indicator */}
			{
				measureLayout.length > 0 &&
				<TabIndicator
					scrollX={scrollX}
					measureLayout={measureLayout}
				/>
			}

			{/* Tabs */}
			{bottomTabs.map((item, index) => (
				<TouchableOpacity
					key={`BottomTab-${index}`}
					ref={item?.ref}
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						paddingHorizontal: 15,

					}}
					onPress={() => onTabPress(index)}
				>
					<Image
						source={item.icon}
						resizeMode="contain"
						style={{
							width: 25,
							height: 25
						}}
					/>
					<Text style={{ marginTop: 3, color: COLORS.white, ...FONTS.h3 }}>{item.label}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

const MainLayout = ({ navigation }) => {

	const { appTheme } = useSelector((state) => state.themeReducer)
	const flatListRef = useRef()
	const scrollX = useRef(new Animated.Value(0)).current

	const onTabPress = useCallback((tabIndex) => {
        flatListRef?.current?.scrollToOffset({
            offset: tabIndex * SIZES.width
        })
    });

	const renderContent = () => {

		const renderItem = ({ item, index }) => (
			<View
				style={{
					width: SIZES.width,
					height: SIZES.height,
				}}
			>
				{item.label == constants.screens.home && <Home />}
				{item.label == constants.screens.search && <Search />}
				{item.label == constants.screens.profile && <Profile />}
			</View>
		);

		return (
			<View style={{ flex: 1 }}>
				<Animated.FlatList
					ref={flatListRef}
					horizontal
					pagingEnabled
					scrollEnabled={false}
					snapToAlignment={"center"}
					snapToInterval={SIZES.width}
					decelerationRate={"fast"}
					showsHorizontalScrollIndicator={false}
					data={constants.bottom_tabs}
					listKey={"Main"}
					keyExtractor={item => `Main-${item.id}`}
					renderItem={renderItem}
					onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX } } }
                    ], {
                        useNativeDriver: false
                    })}
				/>
			</View>
		);
	};

	const renderBottomTab = () => {
		return (
			<View
				style={{
					paddingBottom: SIZES.height > 800 ? 20 : 5,
					paddingHorizontal: SIZES.padding,
					paddingTop: SIZES.radius,
					backgroundColor: appTheme?.backgroundColor1,
				}}
			>
				<Shadow
					size={[SIZES.width - (SIZES.padding * 2), 85]}
				>
					<View
						style={{
							flex: 1,
							borderRadius: SIZES.radius,
							backgroundColor: appTheme?.backgroundColor2
						}}
					>
						<Tabs
							scrollX={scrollX}
							onTabPress={onTabPress}
						/>
					</View>
				</Shadow>
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
			{/* Content Section */}
			{renderContent()}

			{/* BottomTab Section */}
			{renderBottomTab()}
		</View>
	);
};

export default MainLayout;

const styles = StyleSheet.create({});
