import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { API, urlAsset } from "../../config/api";
import { CardLiterature, SkeletonCard } from "../../components";
import color from "../../utils/color";
import { Header } from "react-native-elements";

export const Home = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchData();
    // async function getToken() {
    //   const token = await AsyncStorage.getItem("token");
    //   //console.log(token);
    // }
    // getToken();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/literatures?status=Approved");
      setResult(res.data.data.literatures);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <CardLiterature
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
        status={item.status}
        isActive
        onPress={() => props.navigation.navigate("Detail", { id: item.id })}
      />
    );
  };

  return (
    <>
      <Header
        centerComponent={{
          text: "all Literature",
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
        ) : (
          <FlatList
            data={result}
            renderItem={renderItem}
            refreshing={isLoading}
            onRefresh={fetchData}
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
});
