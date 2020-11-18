import React, { useContext, useState } from "react";
import { View, StyleSheet, FlatList, Text, Dimensions } from "react-native";
import { API, urlAsset } from "../../config/api";
import { CardLiterature, SkeletonCard } from "../../components";
import color from "../../utils/color";
import { Header, Icon } from "react-native-elements";
import { useQuery, useMutation } from "react-query";
import { UserContext } from "../../context/userContext";
import { ActivityIndicator } from "react-native-paper";

export const Collection = (props) => {
  const [state] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const {
    isLoading,
    data: collectionData,
    refetch,
  } = useQuery("getCollectionLiterature", () =>
    API.get(`/collection/${state.user.id}`)
  );

  const renderItem = ({ item }) => {
    return (
      <CardLiterature
        key={item.literatures.id}
        image={urlAsset.img + item.literatures.thumbnail}
        title={item.literatures.title}
        style={{
          backgroundColor: color.primary,
          width: Dimensions.get("window").width / 2 - 30,
        }}
        color={color.white}
        author={item.literatures.author}
        year={item.literatures.publication_date.split("-")[0]}
        isOne={false}
        //one={false}
        status={item.status}
        isActive
        onPress={() =>
          props.navigation.navigate("Detail", { id: item.literatures.id })
        }
      />
    );
  };

  return (
    <>
      <Header
        centerComponent={{
          text: "my Collection",
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
        ) : collectionData.data.data.collections.toString() === "" ? (
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
              You don't have any collection
            </Text>
          </View>
        ) : (
          <FlatList
            data={collectionData.data.data.collections}
            renderItem={renderItem}
            refreshing={isLoading}
            onRefresh={refetch}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
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
