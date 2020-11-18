import React from "react";
import { View, Text } from "react-native";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { urlAsset } from "../../config/api";
import color from "../../utils/color";

export const ListDownload = (props) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={props.onPress}>
      <ListItem containerStyle={props.style}>
        <Text
          style={{
            color: color.white,
            fontFamily: "Metropolis-Bold",
            fontSize: 18,
          }}
        >
          {props.count + 1}
        </Text>
        <ListItem.Content>
          <ListItem.Title
            style={{
              color: props.color,
              fontFamily: "Metropolis-Bold",
              fontSize: 20,
            }}
          >
            {props.name}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              color: color.secondary,
              fontFamily: "Metropolis-Light",
              fontSize: 14,
            }}
          >
            {props.location}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Text
          style={{
            color: props.color,
            fontFamily: "Metropolis-Regular",
            fontSize: 16,
          }}
        >
          X
        </Text>
      </ListItem>
    </TouchableOpacity>
  );
};
