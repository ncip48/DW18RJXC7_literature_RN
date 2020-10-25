import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { Card, Icon } from "react-native-elements";
import color from "../../utils/color";
import { CustomButton } from "../Button/Button";
import { urlAsset } from "../../config/api";

const width = Dimensions.get("window").width;

export const CardDetails = (props) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const setDate = new Date(props.data.publication_date);
  const month = monthNames[setDate.getMonth()];
  const split = props.data.publication_date.split("-");
  const fullDate = split.pop() + " " + month + " " + split[0];

  return (
    <>
      <ScrollView>
        <Card
          containerStyle={{
            ...props.style,
            padding: 0,
            borderWidth: 0,
            marginVertical: 10,
            marginHorizontal: 30,
            marginBottom: 10,
          }}
        >
          <Card.Image
            source={{ uri: urlAsset.img + props.data.thumbnail }}
            style={{
              height: width,
              width: "100%",
              borderRadius: 15,
            }}
          />
          <Text
            style={{
              marginBottom: 10,
              color: props.color,
              fontSize: 34,
              fontFamily: "Times-Bold",
              marginTop: 10,
            }}
          >
            {props.data.title}
          </Text>
          <Text
            style={{
              color: "#929292",
              fontSize: 22,
              fontFamily: "Metropolis-Regular",
              marginTop: -10,
            }}
          >
            {props.data.author}
          </Text>
          <Text
            style={{
              color: color.white,
              fontSize: 22,
              fontFamily: "Metropolis-Bold",
              marginTop: 20,
            }}
          >
            Publication Date
          </Text>
          <Text
            style={{
              color: "#929292",
              fontSize: 18,
              fontFamily: "Metropolis-Regular",
            }}
          >
            {fullDate}
          </Text>
          <Text
            style={{
              color: color.white,
              fontSize: 22,
              fontFamily: "Metropolis-Bold",
              marginTop: 20,
            }}
          >
            Pages
          </Text>
          <Text
            style={{
              color: "#929292",
              fontSize: 18,
              fontFamily: "Metropolis-Regular",
            }}
          >
            {props.data.pages}
          </Text>
          <Text
            style={{
              color: color.secondary,
              fontSize: 22,
              fontFamily: "Metropolis-Bold",
              marginTop: 20,
            }}
          >
            ISBN
          </Text>
          <Text
            style={{
              color: "#929292",
              fontSize: 18,
              fontFamily: "Metropolis-Regular",
            }}
          >
            {props.data.isbn}
          </Text>
        </Card>
      </ScrollView>
      <View
        style={{
          backgroundColor: color.triple,
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
        }}
      >
        <CustomButton
          iconRight
          icon={
            <Icon
              name="clouddownload"
              type="antdesign"
              //size={15}
              color="white"
              style={{ marginLeft: 10 }}
            />
          }
          color={color.white}
          bgColor={color.secondary}
          width={width / 2 - 20}
          style={{ height: 40 }}
          //onPress={() => props.navigation.navigate("Home")}
        >
          Download
        </CustomButton>
        <CustomButton
          iconRight
          icon={
            <Icon
              name="bookmark-alt"
              type="fontisto"
              size={20}
              color="white"
              style={{ marginLeft: 10 }}
            />
          }
          color={color.white}
          bgColor={color.secondary}
          width={width / 2 - 10}
          style={{ height: 40 }}
          //onPress={() => props.navigation.navigate("Home")}
        >
          Add My Collection
        </CustomButton>
      </View>
    </>
  );
};
