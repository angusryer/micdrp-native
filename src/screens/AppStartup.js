import React, { useEffect, useContext } from "react";
import { SafeAreaView, Text, ActivityIndicator } from "react-native";
import firebase from '../config/firebase.config';
import { default as commonStyles } from '../commonStyles';

const AppStartup = ({ navigation }) => {

    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const userData = {
                    uid: user.uid,
                    name: user.displayName,
                    avatar: user.photoURL,
                }
                navigation.navigate("Dashboard")
            } else {
                navigation.navigate("Login")
            }
        });

    }, [])

    return (
        <SafeAreaView style={commonStyles.container} >
            <Text style={commonStyles.centeredText} >{`Ready to\ndrop the mic?`}</Text>
            <ActivityIndicator size="large" />
        </SafeAreaView>
    )
}

export default AppStartup;