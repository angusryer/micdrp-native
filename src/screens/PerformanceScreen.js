import { React } from "react";
import { StyleSheet } from "react-native";

export default function PerformanceScreen() {
    return (
        <View style={styles.container}>
            <Text>Performance Screen</Text>
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