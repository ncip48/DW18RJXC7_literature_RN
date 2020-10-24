import React from "react";
import { Dimensions } from "react-native";
import { Button } from "react-native-elements";

const width = Dimensions.get("window").width;

export const CustomButton = (props) => {
  return (
    <Button
      {...props}
      title={props.children}
      titleStyle={{
        fontFamily: "Metropolis-Regular",
        fontSize: 20,
        color: props.color,
      }}
      buttonStyle={{
        height: 50,
        backgroundColor: props.bgColor,
        borderRadius: 5,
        width: props.width,
        ...props.style,
      }}
    />
  );
};
