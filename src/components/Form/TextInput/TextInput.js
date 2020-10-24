import React from "react";
import { Input } from "react-native-elements";
import { View, Text } from "react-native";
import color from "../../../utils/color";

export const TextInput = (props) => {
  return (
    <Input
      placeholder={props.placeholder}
      {...props}
      inputContainerStyle={{
        borderRadius: 5,
        borderColor: color.white,
        borderWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: "rgba(210, 210, 210, 0.25)",
        borderBottomColor: "white",
        padding: 10,
        paddingVertical: 5,
        width: "100%",
      }}
      inputStyle={{
        color: color.white,
      }}
      errorStyle={{
        color: color.white,
        //fontSize: 14,
      }}
    />
  );
};
