import React, { useContext, useState } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { API, urlAsset } from "../../config/api";
import { CardDetails } from "../../components";
import { UserContext } from "../../context/userContext";
import color from "../../utils/color";
import { Header, Icon } from "react-native-elements";
import { useQuery } from "react-query";
import { ActivityIndicator } from "react-native-paper";

export const DetailLiterature = (props) => {
  const [state] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const { id } = props.route.params;

  const { isLoading, error, data: booksData } = useQuery("getBooks", () =>
    API.get(`/literature/${id}`)
  );

  const renderItem = ({ item }) => {
    return (
      <CardDetails
        key={item.id}
        image={urlAsset.img + item.thumbnail}
        title={item.title}
        style={{
          backgroundColor: color.primary,
          width: Dimensions.get("window").width / 2 - 20,
          //height: Dimensions.get("window").width,
        }}
        color={color.white}
        author={item.author}
        one={false}
        year={item.publication_date.split("-")[0]}
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
          text: "detail Literature",
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
          <ActivityIndicator />
        ) : (
          <CardDetails
            style={{
              backgroundColor: color.primary,
              //width: Dimensions.get("window").width / 2 - 20,
              //height: Dimensions.get("window").width,
            }}
            color={color.white}
            data={booksData.data.data.literature}
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
});
