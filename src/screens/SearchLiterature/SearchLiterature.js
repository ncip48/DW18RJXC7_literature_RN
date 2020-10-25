import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
import { API, urlAsset } from "../../config/api";
import { CardLiterature } from "../../components";
import color from "../../utils/color";
import { Header, SearchBar, Icon, Overlay } from "react-native-elements";
import { RadioButton } from "react-native-paper";

export const SearchLiterature = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(" ");
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  let year = "";

  useEffect(() => {
    fetchData("");
  }, [query]);

  const fetchData = async (year) => {
    try {
      setLoading(true);
      const res = await API.get(
        `/literature?title=${query}&public_year=${year}`
      );
      setResult(res.data.data.literatures);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateSearch = (search) => {
    setQuery(search);
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
        }}
        color={color.white}
        author={item.author}
        one={false}
        year={item.publication_date.split("-")[0]}
        onPress={() => props.navigation.navigate("Detail", { id: item.id })}
      />
    );
  };

  return (
    <>
      <Header
        placement="left"
        centerComponent={
          <SearchBar
            placeholder="Search literature here"
            cancelIcon={false}
            onChangeText={updateSearch}
            value={query}
            containerStyle={styles.containerSearchBar}
            inputStyle={{
              color: color.white,
            }}
          />
        }
        rightComponent={
          <Icon
            type="material"
            name="sort"
            color={color.white}
            onPress={() => setShow(true)}
          />
        }
        containerStyle={{
          backgroundColor: color.primary,
          borderBottomWidth: 0,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.textSearch}>
          {query === "" ? "Search Literature" : `Result: ${query}`}
        </Text>
        {result.toString() === "" ? (
          <Text style={styles.txtNotFound}>No data found</Text>
        ) : (
          <FlatList
            data={result}
            renderItem={renderItem}
            refreshing={isLoading}
            onRefresh={() => fetchData("")}
            keyExtractor={(item) => item.id}
            //horizontal
            numColumns={2}
          />
        )}
      </View>
      <Overlay
        isVisible={show}
        onBackdropPress={() => setShow(false)}
        overlayStyle={{ backgroundColor: color.primary }}
      >
        <RadioButton.Group
          onValueChange={(value) => {
            setValue(value);
            fetchData(value);
          }}
          value={value}
        >
          <RadioButton.Item
            label="All Year"
            value=" "
            color={color.white}
            uncheckedColor={color.white}
            labelStyle={{ color: color.white }}
          />
          <RadioButton.Item
            label="2020"
            value="2020"
            color={color.white}
            uncheckedColor={color.white}
            labelStyle={{ color: color.white }}
          />
          <RadioButton.Item
            label="2019"
            value="2019"
            color={color.white}
            uncheckedColor={color.white}
            labelStyle={{ color: color.white }}
          />
          <RadioButton.Item
            label="2018"
            value="2018"
            color={color.white}
            uncheckedColor={color.white}
            labelStyle={{ color: color.white }}
          />
        </RadioButton.Group>
      </Overlay>
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
  textSearch: {
    color: color.secondary,
    fontSize: 22,
    fontFamily: "Metropolis-Bold",
    textAlign: "center",
    marginVertical: 5,
  },
  txtNotFound: {
    color: color.white,
    fontSize: 22,
    fontFamily: "Metropolis-Bold",
    textAlign: "center",
    marginVertical: 5,
  },
  containerSearchBar: {
    width: Dimensions.get("window").width - 40,
    backgroundColor: color.primary,
    left: -25,
  },
});
