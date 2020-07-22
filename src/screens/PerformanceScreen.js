import React from "react";
import { View, Text } from "react-native";
import { default as commonStyles } from '../commonStyles';

const PerformanceScreen = ({ navigation }) => {
    return (
        <View style={commonStyles.container}>
            <Text>Performance Screen</Text>
        </View>
    )
}

PerformanceScreen.navigationOptions = () => { return {
    headerShown: false
}}

export default PerformanceScreen;