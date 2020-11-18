import React from "react";
import { View, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { urlAsset } from "../../config/api";

export const ListLiterature = (props) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={props.onPress}>
      <ListItem containerStyle={props.style}>
        <Avatar size="medium" source={{ uri: props.image }} />
        <ListItem.Content>
          <ListItem.Title
            style={{
              color: props.color,
              fontFamily: "Times-Regular",
              fontSize: 20,
            }}
          >
            {props.title}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              color: props.color,
              fontFamily: "Metropolis-Regular",
              fontSize: 14,
            }}
          >
            {props.author}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Text
          style={{
            color: props.color,
            fontFamily: "Metropolis-Regular",
            fontSize: 16,
          }}
        >
          {props.year}
        </Text>
      </ListItem>
    </TouchableOpacity>
  );
};
