import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { CustomButton } from "../../components";
import color from "../../utils/color";
import AsyncStorage from "@react-native-community/async-storage";
import { StatusBar } from "expo-status-bar";
import { API, setAuthToken } from "../../config/api";
import { UserContext } from "../../context/userContext";

const width = Dimensions.get("window").width;

async function getToken() {
  const token = await AsyncStorage.getItem("token");
  setAuthToken(token);
  //alert(token);
}

getToken();
// if (AsyncStorage.getItem("token")) setAuthToken(AsyncStorage.getItem("token"));
//console.log(token);

export const Landing = (props) => {
  //const isLogin = false;
  const [state, dispatch] = useContext(UserContext);

  // useEffect(() => {
  //   async function getToken() {
  //     const token = await AsyncStorage.getItem("token");
  //     //setAuthToken(token);
  //     alert(token);
  //   }
  //   getToken();
  // }, []);

  useEffect(() => {
    //isLogin ? props.navigation.navigate("Home") : null;
    // async function getToken() {
    //   const token = await AsyncStorage.getItem("token");
    //   setAuthToken(token);
    //   //alert(token);
    // }
    // getToken();

    const loadUser = async () => {
      try {
        const res = await API.get("/auth");
        dispatch({
          type: "USER_LOADED",
          payload: JSON.stringify(res.data.data.user),
        });
        //alert(res);
        props.navigation.navigate("Home");
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    };
    loadUser();
  }, []);

  //alert(state.user);

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/img/bg1.png")}
          style={{ position: "absolute", top: 0, width: width, height: width }}
        />
        <Text style={styles.header}>source of intelligence</Text>
        <Text style={styles.subHeader}>
          Sign-up and receive unlimited accesss to all of your literatur - share
          your literature.
        </Text>
        <View style={styles.containerBtn}>
          <CustomButton
            color={color.white}
            bgColor={color.secondary}
            width={(1 / 2) * width - 40}
            style={{ marginRight: 10 }}
            onPress={() => props.navigation.navigate("Register")}
          >
            Sign Up
          </CustomButton>
          <CustomButton
            color={color.black}
            bgColor={color.white}
            width={(1 / 2) * width - 40}
            style={{ marginLeft: 10 }}
            onPress={() => props.navigation.navigate("Login")}
          >
            Sign In
          </CustomButton>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    //alignItems: "center",
    backgroundColor: color.primary,
    padding: 30,
  },
  header: {
    color: color.white,
    fontFamily: "Times-Bold",
    fontSize: 58,
    fontStyle: "normal",
    lineHeight: 55,
    marginBottom: 10,
  },
  subHeader: {
    color: color.white,
    fontFamily: "Metropolis-Regular",
    fontSize: 22,
    marginBottom: 25,
  },
  containerBtn: {
    flexDirection: "row",
  },
});
