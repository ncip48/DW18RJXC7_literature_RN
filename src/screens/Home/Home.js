import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { API, urlAsset } from "../../config/api";
import { CardLiterature } from "../../components";
import color from "../../utils/color";
import { Header } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

export const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/literatures");
      setResult(res.data.data.literatures);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <CardLiterature
        key={index}
        image={urlAsset.img + item.thumbnail}
        title={item.title}
        style={{ backgroundColor: color.primary }}
        color={color.white}
        author={item.author}
        year={item.publication_date.split("-")[0]}
      />
    );
  };

  return (
    <>
      <Header
        centerComponent={{
          text: "myLiterature",
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
        <FlatList
          data={result}
          renderItem={renderItem}
          refreshing={isLoading}
          onRefresh={fetchData}
          keyExtractor={(item) => item.id}
        />
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
