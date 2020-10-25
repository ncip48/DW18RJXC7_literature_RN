import AsyncStorage from "@react-native-community/async-storage";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../context/userContext";
import { View, Text, StyleSheet } from "react-native";
import { API, urlAsset } from "../../config/api";
import {
  ListItem,
  Icon,
  Avatar,
  Header,
  Accessory,
} from "react-native-elements";
import color from "../../utils/color";

export const Profile = (props) => {
  const [state] = useContext(UserContext);

  const { isLoading, data: userDetail, refetch } = useQuery(
    "getUserDetail",
    () => API.get(`/profile/${JSON.parse(state.user).id}`)
  );

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    props.navigation.navigate("Landing");
  };
  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: "my Profile",
          style: {
            color: color.secondary,
            fontSize: 22,
            fontFamily: "Metropolis-Bold",
          },
        }}
        containerStyle={{
          backgroundColor: color.primary,
          borderBottomWidth: 0,
        }}
      />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <ListItem
            containerStyle={styles.containerListItem}
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
          >
            <Avatar
              size="large"
              rounded
              source={{
                uri: urlAsset.img + userDetail.data.data.user.photoProfile,
              }}
              title={userDetail.data.data.user.fullName[0]}
            >
              <Accessory
                size={20}
                color={color.white}
                style={{ backgroundColor: color.triple }}
              />
            </Avatar>
            <ListItem.Content>
              <ListItem.Title style={styles.textListItemName}>
                {userDetail.data.data.user.fullName}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.textListItemMail}>
                {userDetail.data.data.user.email}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={styles.textListItemMail}>
                {userDetail.data.data.user.phone}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={styles.textListItemMail}>
                {userDetail.data.data.user.address}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </>
      )}
      <View>
        <ListItem
          containerStyle={styles.containerListItem}
          onPress={() => props.navigation.navigate("myLiterature")}
        >
          <Icon type="feather" name="book" color={color.white} />
          <ListItem.Content>
            <ListItem.Title style={styles.textListItem}>
              My Literature
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          onPress={() => logout()}
          containerStyle={styles.containerListItem}
        >
          <Icon type="feather" name="log-out" color={color.white} />
          <ListItem.Content>
            <ListItem.Title style={styles.textListItem}>Logout</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    paddingTop: 0,
    paddingBottom: 0,
  },
  containerListItem: {
    backgroundColor: color.primary,
    color: color.white,
  },
  textListItem: {
    color: color.white,
  },
  textListItemName: {
    fontFamily: "Metropolis-Bold",
    color: color.white,
    fontSize: 24,
  },
  textListItemMail: {
    fontFamily: "Metropolis-Regular",
    color: color.white,
    fontSize: 14,
  },
});
