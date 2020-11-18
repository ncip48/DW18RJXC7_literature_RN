import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
import { API, urlAsset } from "../../config/api";
import { CardLiterature, ListDownload } from "../../components";
import { UserContext } from "../../context/userContext";
import color from "../../utils/color";
import { Header, Icon } from "react-native-elements";
import * as FileSystem from "expo-file-system";
import { ActivityIndicator } from "react-native-paper";

export const MyDownload = (props) => {
  const [state] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [doc, setDoc] = useState([]);

  const renderItem = ({ item, index }) => {
    return <ListDownload key={index} name={item.file_name} />;
  };

  useEffect(() => {
    getDownload();
  }, []);

  const getDownload = async () => {
    let dir = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory + "app_docs"
    );

    dir.forEach((val) => {
      //setDoc(FileSystem.documentDirectory + "app_docs/" + val);
      setDoc((doc) => [
        ...doc,
        {
          file_name: val,
          uri: FileSystem.documentDirectory + "app_docs/" + val,
        },
      ]);
      //   this.state.docsList.push(
      //     FileSystem.documentDirectory + "app_docs/" + val
      //   );
    });

    //await setDoc([...doc, doc]);
  };

  //   const renderItem = ({ item }) => {
  //     return <Text>{item}</Text>;
  //   };

  return (
    <>
      <Header
        leftComponent={
          <Icon
            type="feather"
            name="arrow-left"
            color={color.white}
            onPress={() => props.navigation.goBack()}
          />
        }
        centerComponent={{
          text: "my Download",
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
      <View style={styles.container}>
        {/* <FlatList
          data={doc}
          renderItem={renderItem}
          //refreshing={isLoading}
          //onRefresh={refetch}
          keyExtractor={(index) => index}
        /> */}
        {doc.map((val, key) => (
          <ListDownload
            key={key}
            count={key}
            name={val.file_name}
            location={val.uri}
            style={{
              backgroundColor: color.primary,
              width: Dimensions.get("window").width,
            }}
            color={color.white}
          />
        ))}
        {/* {isLoading ? (
          <ActivityIndicator />
        ) : booksProfile.data.data.literatures.toString() === "" ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Icon
              name="book-remove-multiple"
              type="material-community"
              color={color.secondary}
              size={60}
            />
            <Text style={styles.txtNotFound}>
              You don't have any literatures
            </Text>
          </View>
        ) : (
          <FlatList
            data={booksProfile.data.data.literatures}
            renderItem={renderItem}
            refreshing={isLoading}
            onRefresh={refetch}
            keyExtractor={(item) => item.id.toString()}
            //horizontal
            numColumns={2}
          />
        )} */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    //padding: 30,
    paddingTop: 0,
    paddingBottom: 0,
  },
  txtNotFound: {
    color: color.white,
    fontSize: 22,
    fontFamily: "Metropolis-Bold",
    textAlign: "center",
    marginVertical: 5,
  },
});
