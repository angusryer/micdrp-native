import React from "react";
import { View, Text, Button } from "react-native";
import firebase from '../config/firebase.config';
import { default as commonStyles } from '../commonStyles';

const LoginScreen = ({ navigation }) => {

    const signIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => { 
                
                // setUser({
                //     user: {
                //         data: result.user.providerData[0],
                //         token: result.credential.accessToken
                //     }
                // })
                // if (args.length !== 0) { args.setLoading(false) }
            }).catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
            });
    }

    return (
        <View style={commonStyles.container}>
            <Text>Login asdasdScreen</Text>
            <Button title="Learn more" onPress={() => navigation.navigate('Learn')} />
            <Button title="Sign in" onPress={() => signIn()} />
        </View>
    )
}

LoginScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

export default LoginScreen;