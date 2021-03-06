import React, { useContext, useState } from "react";
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
import { API, urlAsset } from "../../config/api";
import { CardLiterature, SkeletonCard } from "../../components";
import { UserContext } from "../../context/userContext";
import color from "../../utils/color";
import { Header, Icon } from "react-native-elements";
import { useQuery } from "react-query";
import { ActivityIndicator } from "react-native-paper";

export const MyLiterature = (props) => {
  const [state] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const { isLoading, data: booksProfile, refetch } = useQuery(
    "getMyLiterature",
    () => API.get(`/profile/${JSON.parse(state.user).id}/literature`)
  );

  const renderItem = ({ item }) => {
    return (
      <CardLiterature
        key={item.id}
        image={urlAsset.img + item.thumbnail}
        title={item.title}
        style={{
          backgroundColor: color.primary,
          width: Dimensions.get("window").width / 2 - 30,
          //height: Dimensions.get("window").width,
        }}
        color={color.white}
        author={item.author}
        one={false}
        year={item.publication_date.split("-")[0]}
        myOwn
        isActive={item.status === "Approved" ? true : false}
        status={item.status}
        onPress={() => props.navigation.navigate("Detail", { id: item.id })}
      />
    );
  };

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
          text: "my Literature",
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
        {isLoading ? (
          <SkeletonCard />
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
        )}
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
