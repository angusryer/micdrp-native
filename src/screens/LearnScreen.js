import { React } from "react";
import { StyleSheet } from "react-native";

export default function LearnScreen({ navigation }) {
    return (
        <View>
            <Text>Learn Screen</Text>
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})