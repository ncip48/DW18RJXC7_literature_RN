import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import color from "../../../utils/color";

const width = Dimensions.get("window").width;

export const CustomPicker = (props) => {
  return (
    <RNPickerSelect
      {...props}
      useNativeAndroidPickerStyle={false}
      style={pickerSelectStyles}
    />
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    borderRadius: 5,
    borderColor: color.white,
    borderWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: "rgba(210, 210, 210, 0.25)",
    borderBottomColor: "white",
    padding: 10,
    //paddingVertical: 5,
    width: width - 70,
    color: color.white,
    marginBottom: 25,
  },
});
