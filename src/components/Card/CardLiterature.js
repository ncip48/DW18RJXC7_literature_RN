import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Card } from "react-native-elements";

const width = Dimensions.get("window").width;

export const CardLiterature = (props) => {
  return (
    <Card
      containerStyle={{
        ...props.style,
        padding: 0,
        borderWidth: 0,
        marginVertical: 30,
        marginHorizontal: 30,
      }}
    >
      <Card.Image
        source={{ uri: props.image }}
        style={{ height: width, width: "100%", borderRadius: 15 }}
      />
      <Text
        style={{
          marginBottom: 10,
          color: props.color,
          fontSize: 24,
          fontFamily: "Times-Bold",
          marginTop: 10,
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
  );
};
