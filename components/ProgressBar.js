import { View, Text } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';

const ProgressBar = ({ containerStyle, progress }) => {
    return (
        <View
            style={{
                width: "100%",
                height: 13,
                borderRadius: 10,
                backgroundColor: COLORS.white,
                ...containerStyle
            }}
        >
            <View
                style={{
                    position:"absolute",
                    left:0,
                    top:0,
                    width:progress,
                    height:"100%",
                    borderRadius:10,
                    backgroundColor:COLORS.primary
                }}
            >
            </View>
        </View>
    );
};

export default ProgressBar;
