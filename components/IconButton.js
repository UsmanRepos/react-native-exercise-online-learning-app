
import { TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';

const IconButton = ({ containerStyle, iconStyle, icon, onPress }) => {
    return (
        <TouchableOpacity
            style={containerStyle}
            onPress={onPress}
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.white,
                    ...iconStyle
                }}
            />
        </TouchableOpacity>
    );
};

export default IconButton;
