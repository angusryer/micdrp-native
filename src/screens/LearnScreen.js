import React from "react";
import { View, Text, Button } from "react-native";
import { default as commonStyles } from '../commonStyles';

const LearnScreen = ({ navigation }) => {
    return (
        <View>
          <Text>Learn Screen</Text>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

LearnScreen.navigationOptions = () => { return {
    headerShown: false
}}

export default LearnScreen;