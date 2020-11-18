import AsyncStorage from "@react-native-community/async-storage";
import React, { useContext, useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../context/userContext";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { API, urlAsset } from "../../config/api";
import {
  ListItem,
  Icon,
  Avatar,
  Header,
  Accessory,
  Button,
} from "react-native-elements";
import BottomSheet from "reanimated-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity as RNGHTouchableOpacity } from "react-native-gesture-handler";
import color from "../../utils/color";

export const Profile = (props) => {
  const [state, dispatch] = useContext(UserContext);
  //const [isVisible, setIsVisible] = useState(false);
  const sheetRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const { isLoading, data: userDetail, refetch } = useQuery(
    "getUserDetail",
    () => API.get(`/profile/${JSON.parse(state.user).id}`)
  );

  const logout = async () => {
    dispatch({
      type: "LOGOUT",
    });
    await AsyncStorage.removeItem("token");
    props.navigation.navigate("Landing");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const renderSheetDialog = () => (
    <View>
      <View
        style={{
          backgroundColor: color.triple,
          alignItems: "center",
          height: 20,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: color.white,
            height: 6,
            width: "10%",
            borderRadius: 6,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: color.triple,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RNGHTouchableOpacity
          activeOpacity={1}
          onPress={() => {
            pickImage();
          }}
          //style={styles.button}
        >
          <Text style={{ color: color.white }}>Select a new photo</Text>
        </RNGHTouchableOpacity>
        {/* <Button
          title="Pick an image from camera roll"
          onPress={() => console.log("TTT")}
        /> */}
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    </View>
  );

  return (
    <>
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
                  onPress={() => sheetRef.current.snapTo(0)}
                  //onPress={pickImage}
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
            containerStyle={styles.containerListItem}
            onPress={() => props.navigation.navigate("myDownload")}
          >
            <Icon type="feather" name="download" color={color.white} />
            <ListItem.Content>
              <ListItem.Title style={styles.textListItem}>
                My Download
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
              <ListItem.Title style={styles.textListItem}>
                Logout
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      </View>
      <BottomSheet
        initialSnap={1}
        ref={sheetRef}
        snapPoints={[220, 0, 0]}
        borderRadius={20}
        //renderHeader={renderHeader}
        renderContent={renderSheetDialog}
        enabledManualSnapping={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    paddingTop: 0,
    paddingBottom: 0,
    padding: 10,
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
