import React, { useState, useContext, useEffect, useReducer, useMemo, createContext } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import firebase from 'firebase';
import { WEB_CLIENT_ID } from './src/config/google.config';
import * as Google from 'expo-google-app-auth';
// import { decode, encode } from 'base-64'
// if (!global.btoa) { global.btoa = encode }
// if (!global.atob) { global.atob = decode }

const UserContext = createContext();

const Splash = () => {
  return (
    <View style={{ justifyContent: 'center', marginTop: 'auto', marginBottom: 'auto' }} >
      <ActivityIndicator size="large" />
    </View>
  )
}

const LoginScreen = ({ navigation }) => {
  const { signIn } = useContext(UserContext)
  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Learn more" onPress={() => navigation.navigate('Learn')} />
      <Button title="Sign in" onPress={() => {
        signInWithGoogleAsync();
      }} />
    </View>
  )
}

const LearnScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Learn Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  )
}

const DashboardScreen = () => {
  return (
    <View>
      <Text>Dashboard Screen</Text>
    </View>
  )
}

const PerformanceScreen = () => {
  return (
    <View>
      <Text>Performance Screen</Text>
    </View>
  )
}

const AuthorizedNavigator = createAppContainer(
  createDrawerNavigator({
    Dashboard: { screen: DashboardScreen },
    Performance: { screen: PerformanceScreen },
    Learn: { screen: LearnScreen },
    Logout: { screen: LoginScreen } // Need to run logout function and dispose of drawer, not render LoginScreen within the drawer 
  })
)

const GuestNavigator = createAppContainer(
  createSwitchNavigator({
    Login: { screen: LoginScreen },
    Learn: { screen: LearnScreen }
  })
);

// const isAuthorized = () => {
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       return true;
//     } else {
//       return false;
//     }
//   })
// }

// const isUserEqual = (googleUser, firebaseUser) => {
//   if (firebaseUser) {
//     let providerData = firebaseUser.providerData;
//     for (let i = 0; i < providerData.length; i++) {
//       if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
//         providerData[i].uid === googleUser.getBasicProfile().getId()) {
//         // We don't need to reauth the Firebase connection.
//         return true;
//       }
//     }
//   }
//   return false;
// }

// const onSignIn = (googleUser) => {
//   console.log('Google Auth Response', googleUser);
//   // We need to register an Observer on Firebase Auth to make sure auth is initialized.
//   let unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
//     unsubscribe();
//     // Check if we are already signed-in Firebase with the correct user.
//     if (!isUserEqual(googleUser, firebaseUser)) {
//       // Build Firebase credential with the Google ID token.
//       let credential = firebase.auth.GoogleAuthProvider.credential(
//         googleUser.getAuthResponse().id_token);
//       // Sign in with credential from the Google user.
//       firebase.auth().signInWithCredential(credential).catch((error) => {
//         // Handle Errors here.
//         let errorCode = error.code;
//         let errorMessage = error.message;
//         // The email of the user's account used.
//         let email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         let credential = error.credential;
//         // ...
//       });
//     } else {
//       console.log('User already signed-in Firebase.');
//     }
//   });
// }

const signInAsync = () => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = response.user.uid
      const usersRef = firebase.firestore().collection('users')
      usersRef
        .doc(uid)
        .get()
        .then(firestoreDocument => {
          if (!firestoreDocument.exists) {
            alert("User does not exist anymore.")
            return;
          }
          const user = firestoreDocument.data()
          navigation.navigate('Home', { user: user })
        })
        .catch(error => {
          alert(error)
        });
    })
    .catch(error => {
      alert(error)
    })
}

const signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      clientId: WEB_CLIENT_ID,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      console.log("Token received! ", result.accessToken)
      signIn(result)
      return result.accessToken;
    } else {
      console.log("User cancelled.")
      return { cancelled: true };
    }
  } catch (e) {
    console.log("Error! ", e)
    return {
      error: true,
      message: e.message
    };
  }
}

export default function App() {

  const [loading, setLoading] = useState(false);
  const [user, signIn] = useState(null);
  const userProvider = [user, signIn];

  //   const signInWithGoogleAsync = async () => {
  //     try {
  //         const result = await Expo.Google.logInAsync(logInConfig);
  //         if (result.type === 'success') {
  //             Fire.shared.onSignIn(result);
  //             return result.accessToken;
  //         } else {
  //             return { cancelled: true};
  //         }
  //     } catch (e) {
  //         return { error: true };
  //     }
  // };

  //   const syncUserWithStateAsync = async () => {
  //     const user = await GoogleSignIn.signInSilentlyAsync();
  //     setUser(user);
  //   };

  //   const initAsync = async () => {
  //     await GoogleSignIn.initAsync({
  //       clientId: '876062261559-k0lle98cb3q16e32fp7f5qp3pcuq7tpa.apps.googleusercontent.com',
  //     });
  //     syncUserWithStateAsync();
  //   };

  //   const [state, dispatch] = useReducer(
  //     (prevState, action) => {
  //       switch (action.type) {
  //         case 'RESTORE_TOKEN':
  //           return {
  //             ...prevState,
  //             userToken: action.token,
  //             isLoading: false,
  //           };
  //         case 'SIGN_IN':
  //           return {
  //             ...prevState,
  //             isSignout: false,
  //             userToken: action.token,
  //           };
  //         case 'SIGN_OUT':
  //           return {
  //             ...prevState,
  //             isSignout: true,
  //             userToken: null,
  //           };
  //       }
  //     },
  //     {
  //       isLoading: true,
  //       isSignout: false,
  //       userToken: null,
  //     }
  //   );

  useEffect(() => {
    signInWithGoogleAsync();
    // Fetch the token from storage then navigate to our appropriate place
    // const getUserToken = async () => {
    // let userToken;
    // try {
    //   userToken = await AsyncStorage.getItem('userToken');
    //   dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    // } catch (e) {
    //   console.debug("User token could not be retrieved.");
    //   initAsync();
    // }
    // After restoring token, we may need to validate it in production apps
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // };
    // getUserToken();
  }, []);

  // const authorizationContext = useMemo(
  //   () => ({
  //     signIn: async data => {
  //       try {
  //         await GoogleSignIn.askForPlayServicesAsync();
  //         const { type, user } = await GoogleSignIn.signInAsync();
  //         if (type === 'success') {
  //           dispatch({ type: 'SIGN_IN', token: user.token });
  //           syncUserWithStateAsync();
  //         }
  //       } catch ({ message }) {
  //         alert('login: Error:' + message);
  //       }
  //       // In a production app, we need to send some data (usually username, password) to server and get a token
  //       // We will also need to handle errors if sign in failed
  //       // After getting token, we need to persist the token using `AsyncStorage`
  //       // In the example, we'll use a dummy token
  //     },
  //     signOut: async () => {
  //       await GoogleSignIn.signOutAsync();
  //       dispatch({ type: 'SIGN_OUT' })
  //     },
  //     signUp: async data => {
  //       // In a production app, we need to send user data to server and get a token
  //       // We will also need to handle errors if sign up failed
  //       // After getting token, we need to persist the token using `AsyncStorage`
  //       // In the example, we'll use a dummy token
  //       dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
  //     },
  //   }),
  //   []
  // );

  if (loading) {
    return <Splash />
  } else {
    return (
      <UserContext.Provider value={userProvider}>
        {user ? <AuthorizedNavigator /> : <GuestNavigator />}
      </UserContext.Provider>
    );
  }
}



