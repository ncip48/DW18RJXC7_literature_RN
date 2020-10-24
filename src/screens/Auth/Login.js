import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { CustomButton, TextInput } from "../../components";
import color from "../../utils/color";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const Login = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/img/bg1.png")}
        style={{ top: 0, width: width, height: width }}
      />
      <Text style={styles.txtHeader}>Sign In</Text>
      <View style={styles.dockerBottom}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => alert(JSON.stringify(values))}
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
                //onPress={handleSubmit}
                onPress={() => props.navigation.navigate("Home")}
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
