import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Card } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;

export const CardLiterature = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={1}
      style={{
        backgroundColor: props.isActive
          ? "transparent"
          : "rgba(196,196,196,0.7)",
        flex: 1,
        borderWidth: 0,
        margin: props.myOwn ? 5 : 0,
        borderRadius: 15,
      }}
      disabled={!props.isActive}
    >
      <Card
        containerStyle={{
          ...props.style,
          padding: 0,
          borderWidth: 0,
          marginVertical: 10,
          marginHorizontal: props.isOne ? 30 : 10,
          marginBottom: props.myOwn ? 10 : 20,
          backgroundColor: props.isActive
            ? "transparent"
            : "rgba(196,196,196,0)",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0,
          shadowRadius: 0,

          elevation: 0,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Times-Bold",
              fontSize: 18,
              opacity: props.isActive ? 0 : 1,
              color: props.status === "Canceled" ? "red" : "yellow",
            }}
          >
            {props.status === "Canceled"
              ? props.status
              : "Waiting to be verified."}
          </Text>
        </View>
        <Card.Image
          source={{ uri: props.image }}
          style={{
            height: props.isOne ? width : width / 2,
            width: "100%",
            borderRadius: 15,
            opacity: props.isActive ? 1 : 0.2,
          }}
        />
        <Text
          style={{
            marginBottom: 10,
            color: props.color,
            fontSize: props.isOne ? 24 : 20,
            fontFamily: "Times-Bold",
            marginTop: props.isOne ? 10 : 5,
            opacity: props.isActive ? 1 : 0.5,
          }}
        >
          {props.title}
        </Text>
        <View
          style={{
            color: "#929292",
            marginTop: -10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#929292",
              fontSize: 18,
              fontFamily: "Metropolis-Regular",
            }}
          >
            {props.author}
          </Text>
          <Text
            style={{
              color: "#929292",
              fontSize: 18,
              fontFamily: "Metropolis-Regular",
            }}
          >
            {props.year}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
