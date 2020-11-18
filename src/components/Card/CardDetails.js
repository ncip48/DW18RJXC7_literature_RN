import React, { useState } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { Card, Icon, Overlay } from "react-native-elements";
import color from "../../utils/color";
import { CustomButton } from "../Button/Button";
import { urlAsset } from "../../config/api";
import * as FileSystem from "expo-file-system";
import { Snackbar } from "react-native-paper";

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

  const [visible, setVisible] = useState(false);
  const [visibleC, setVisibleC] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");

  const onToggleSnackBar = () => setShowSnack(!showSnack);

  const onDismissSnackBar = () => setShowSnack(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleOverlayC = () => {
    setVisibleC(!visibleC);
  };

  const donwloadFile = async () => {
    try {
      const fileUri =
        FileSystem.documentDirectory + "app_docs/" + props.data.attache;
      const url = urlAsset.books + props.data.attache;

      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "app_docs/",
        { intermediates: true }
      );

      let downloadObject = FileSystem.createDownloadResumable(url, fileUri);
      let response = await downloadObject.downloadAsync();
      //console.log(response);
      setMessage("Download completed, please see in profile");
      onToggleSnackBar();
    } catch (err) {
      setMessage(err.message);
      onToggleSnackBar();
    }
  };

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
              color={color.secondary}
              style={{ marginLeft: 10 }}
            />
          }
          color={color.secondary}
          bgColor={color.white}
          width={width / 2 - 20}
          style={{ height: 40 }}
          onPress={toggleOverlay}
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
          onPress={toggleOverlayC}
          //onPress={() => props.navigation.navigate("Home")}
        >
          Add My Collection
        </CustomButton>
      </View>
      <Snackbar
        visible={showSnack}
        onDismiss={onDismissSnackBar}
        style={{
          backgroundColor: color.secondary,
          bottom: Dimensions.get("window").height - 100,
        }}
        action={{
          label: "X",
          onPress: () => onDismissSnackBar(),
        }}
      >
        {message}
      </Snackbar>
      <Overlay
        overlayStyle={{
          backgroundColor: color.primary,
          borderRadius: 10,
          margin: 10,
        }}
        backdropStyle={{
          backgroundColor: "rgba(37,37,37, 0.9)",
        }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Text
          style={{
            color: color.white,
            fontSize: 22,
            fontFamily: "Metropolis-Bold",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Do you want to download this literature?
        </Text>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "center",
          }}
        >
          <CustomButton
            color={color.white}
            bgColor={"transparent"}
            width={width / 2 - 50}
            //style={{ height: 40 }}
            onPress={() => {
              donwloadFile();
              toggleOverlay();
            }}
            //onPress={() => props.navigation.navigate("Home")}
          >
            Yes
          </CustomButton>
          <CustomButton
            color={color.secondary}
            bgColor={"transparent"}
            width={width / 2 - 50}
            //style={{ height: 40 }}
            //onPress={() => props.navigation.navigate("Home")}
            onPress={toggleOverlay}
          >
            No
          </CustomButton>
        </View>
      </Overlay>
      <Overlay
        overlayStyle={{
          backgroundColor: color.primary,
          borderRadius: 10,
          margin: 10,
        }}
        backdropStyle={{
          backgroundColor: "rgba(37,37,37, 0.9)",
        }}
        isVisible={visibleC}
        onBackdropPress={toggleOverlayC}
      >
        <Text
          style={{
            color: color.white,
            fontSize: 22,
            fontFamily: "Metropolis-Bold",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Do you want to add to collection?
        </Text>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "center",
          }}
        >
          <CustomButton
            color={color.white}
            bgColor={"transparent"}
            width={width / 2 - 50}
            //style={{ height: 40 }}
            // onPress={() => {
            //   donwloadFile();
            //   toggleOverlay();
            // }}
            //onPress={() => props.navigation.navigate("Home")}
          >
            Yes
          </CustomButton>
          <CustomButton
            color={color.secondary}
            bgColor={"transparent"}
            width={width / 2 - 50}
            //style={{ height: 40 }}
            //onPress={() => props.navigation.navigate("Home")}
            onPress={toggleOverlayC}
          >
            No
          </CustomButton>
        </View>
      </Overlay>
    </>
  );
};
