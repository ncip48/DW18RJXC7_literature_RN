import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { CustomButton } from "../../components";
import color from "../../utils/color";

const width = Dimensions.get("window").width;

export const Landing = (props) => {
  const isLogin = false;

  useEffect(() => {
    isLogin ? props.navigation.navigate("Home") : null;
  }, []);

  return (
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
