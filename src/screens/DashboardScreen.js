import React from "react";
import { View, Text } from "react-native";
import { default as commonStyles } from '../commonStyles';

const DashboardScreen = ({ navigation }) => {
    return (
        <View style={commonStyles.container}>
            <Text>Dashboard Screen</Text>
        </View>
    )
}

DashboardScreen.navigationOptions = () => { return {
    headerShown: false
}}

export default DashboardScreen;