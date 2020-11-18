import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as yup from "yup";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../../config/api";
import { Formik } from "formik";
import { UserContext } from "../../context/userContext";
import { CustomButton, TextInput, CustomPicker } from "../../components";
import color from "../../utils/color";
import AsyncStorage from "@react-native-community/async-storage";
import { Snackbar } from "react-native-paper";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const Register = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [registerAction, { isLoading, error }] = useMutation(async (values) => {
    try {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = values;

        const res = await API.post("/register", body, config);

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
      <Text style={styles.txtHeader}>Sign Up</Text>
      <View style={styles.dockerBottom}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            fullName: "",
            gender: "Male",
            phone: "",
            address: "",
          }}
          onSubmit={(values) => registerAction(values)}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().min(8).required(),
            fullName: yup.string().required().min(3),
            gender: yup.string().required(),
            phone: yup.number().required().min(8),
            address: yup.string().required().min(5),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            handleSubmit,
            setFieldValue,
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
              <TextInput
                placeholder="Full Name"
                value={values.fullName}
                onChangeText={handleChange("fullName")}
                errorMessage={
                  touched.fullName && errors.fullName && errors.fullName
                }
                onBlur={() => setFieldTouched("fullName")}
              />
              <CustomPicker
                value={values.gender}
                onValueChange={(value) => setFieldValue("gender", value)}
                items={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
                placeholder={{
                  label: "Select a Gender",
                  value: null,
                  color: "grey",
                }}
              />
              <TextInput
                placeholder="Phone"
                value={values.phone}
                onChangeText={handleChange("phone")}
                errorMessage={touched.phone && errors.phone && errors.phone}
                onBlur={() => setFieldTouched("phone")}
              />
              <TextInput
                placeholder="Address"
                value={values.address}
                onChangeText={handleChange("address")}
                errorMessage={
                  touched.address && errors.address && errors.address
                }
                onBlur={() => setFieldTouched("address")}
              />
              <CustomButton
                color={color.white}
                bgColor={color.secondary}
                width={width - 70}
                style={{ height: 40 }}
                onPress={handleSubmit}
                loading={isLoading}
              >
                Sign Up
              </CustomButton>
            </>
          )}
        </Formik>
        <Text style={styles.txtAccount}>
          Already have account?{" "}
          <Text
            style={styles.txtBottom}
            onPress={() => props.navigation.navigate("Login")}
          >
            Sign in
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
