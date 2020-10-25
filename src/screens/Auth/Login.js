import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { useMutation } from "react-query";
import { CustomButton, TextInput } from "../../components";
import color from "../../utils/color";
import { UserContext } from "../../context/userContext";
import { API, setAuthToken } from "../../config/api";
import AsyncStorage from "@react-native-community/async-storage";
import { Snackbar } from "react-native-paper";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const Login = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [loginAction, { isLoading, error }] = useMutation(async (values) => {
    try {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = values;

        const res = await API.post("/login", body, config);

        await AsyncStorage.setItem("token", res.data.data.token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data.data,
        });

        //console.log(res.data.data.token);

        setAuthToken(res.data.data.token);

        try {
          const res = await API.get("/auth");
          dispatch({
            type: "USER_LOADED",
            payload: JSON.stringify(res.data.data.user),
          });
        } catch (err) {
          dispatch({
            type: "AUTH_ERROR",
          });
        }

        props.navigation.navigate("Home");
      } catch (err) {
        onToggleSnackBar();
        dispatch({
          type: "LOGIN_FAILED",
        });
        setErrorMsg(err.response.data.error.message);
      }
    } catch (err) {
      onToggleSnackBar();
      console.log(err);
      setErrorMsg(err.message);
    }
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/img/bg1.png")}
        style={{ position: "absolute", top: 0, width: width, height: width }}
      />
      <Text style={styles.txtHeader}>Sign In</Text>
      <View style={styles.dockerBottom}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => loginAction(values)}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().min(8).required(),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            handleSubmit,
          }) => (
            <>
              <TextInput
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                errorMessage={touched.email && errors.email && errors.email}
                onBlur={() => setFieldTouched("email")}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange("password")}
                errorMessage={
                  touched.password && errors.password && errors.password
                }
                onBlur={() => setFieldTouched("password")}
              />
              <CustomButton
                color={color.white}
                bgColor={color.secondary}
                width={width - 70}
                style={{ height: 40 }}
                loading={isLoading}
                onPress={handleSubmit}
                //onPress={() => props.navigation.navigate("Home")}
              >
                Sign In
              </CustomButton>
            </>
          )}
        </Formik>
        <Text style={styles.txtAccount}>
          Don't have an account?{" "}
          <Text
            style={styles.txtBottom}
            onPress={() => props.navigation.navigate("Register")}
          >
            Sign up
          </Text>
        </Text>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{
          backgroundColor: color.secondary,
          bottom: Dimensions.get("window").height - 80,
        }}
        action={{
          label: "X",
          onPress: () => onDismissSnackBar(),
        }}
      >
        {errorMsg}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#252525",
  },
  txtHeader: {
    fontFamily: "Metropolis-Bold",
    color: color.white,
    fontSize: 36,
    marginLeft: 30,
    marginBottom: 15,
  },
  dockerBottom: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: color.primary,
    padding: 25,
    paddingTop: 50,
    //height: (1 / 2) * height,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  txtAccount: {
    color: color.white,
    fontFamily: "Metropolis-Regular",
    textAlign: "center",
    fontSize: 16,
    marginTop: 25,
  },
  txtBottom: {
    fontFamily: "Metropolis-Regular",
    color: color.secondary,
  },
});
