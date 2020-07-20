import { React } from "react";
import { StyleSheet } from "react-native";

export default function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <Button title="Learn more" onPress={() => navigation.navigate('Learn')} />
            <Button title="Sign in" onPress={() => {
                signInWithGoogleAsync();
            }} />
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