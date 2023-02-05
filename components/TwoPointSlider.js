import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { COLORS, FONTS, SIZES } from '../constants'

const TwoPointSlider = ({ values, min, max, prefix, postfix, onValuesChange }) => {
    return (
        <MultiSlider
            min={min}
            max={max}
            values={values}
            step={1}
            markerOffsetY={15}
            selectedStyle={{
                height: 2,
                backgroundColor: COLORS.primary
            }}
            trackStyle={{
                height: 1,
                borderRadius: 10,
                backgroundColor: COLORS.gray30
            }}
            customMarker={(e) => {
                return (
                    <View
                        style={{
                            width: 60,
                            height: 60,
                            justifyContent: "center",
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                width: 15,
                                height: 15,
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: COLORS.primary,
                                backgroundColor: COLORS.white
                            }}
                        >
                        </View>
                        <Text style={{ marginTop: 5, color: COLORS.gray80, ...FONTS.body3 }}>{prefix} {e.currentValue} {postfix}</Text>
                    </View>
                )
            }}
            onValuesChange = {(values) => onValuesChange(values)}
        />
    );
};

export default TwoPointSlider;

const styles = StyleSheet.create({});
