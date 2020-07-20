import { React, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
// import { firebase } from "../config/firebase.config";

export default function SplashScreen({ initiateAuthProcess }) {

    useEffect(() => initiateAuthProcess({
        loading: false,
        user: {
            name: "Angus"
        }
    }), [])

    return (
        <SafeAreaView>
            <View style={styles.container} >
                <ActivityIndicator size="large" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})