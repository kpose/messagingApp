import {StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';



const ToolbarButton = ({ title, onPress }) => (
    <TouchableOpacity onPress =  {onPress}>
        <Text style ={styles.button}>{title}</Text>
    </TouchableOpacity>
);

ToolbarButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default class Toolbar extends React.Component {
    static PropTypes = {
        isFocused:PropTypes.bool.isRequired,
        onChangeFocus: PropTypes.func,
        onSubmit: PropTypes.func,
        onPressCamera: PropTypes.func,
        onPressLocation: PropTypes.func,
    };

    static.defaultProps= {
        onChangeFocus: () => {},
        onSubmit: () => {},
        onPressCamera: () => {},
        onPressLocation: () => {},
    };

    render() {
        const {onPressCamera, onPressLocation } = this.props;
        return(
            <View style={styles.toolbar}>
                {/* .....*/ }
                <ToolbarButton title={'C'} onPress={onPressCamera}/>
                <ToolbarButton title={'L'} onPress = {onPressLocation}/>
                {/*....*/}
            </View>
        );
    }
}




const styles= StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingLeft: 16,
        backgroundColor: 'white',
    },

    button: {
        top: -2,
        marginRight: 12,
        fontSize: 20,
        color: 'grey',
    },
    //
});