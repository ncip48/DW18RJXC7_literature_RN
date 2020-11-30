import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { CustomButton, TextInput, CustomPicker } from "../../components";
import color from "../../utils/color";
import * as DocumentPicker from "expo-document-picker";
import { Header, Icon, Overlay } from "react-native-elements";
import { urlAsset, API, setAuthToken } from "../../config/api";
import { useMutation } from "react-query";
import * as ImagePicker from "expo-image-picker";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const AddLiterature = (props) => {
  const SUPPORTED_FORMATS_IMAGE = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const [attache, setAttache] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (!result.cancelled) {
      setAttache(result.uri);
    }
  };

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

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.cancelled) {
      setThumbnail(result.uri);
    }
  };

  const [addBook] = useMutation(async (values) => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };

      let localUri = thumbnail;
      let filename = thumbnail.split("/").pop();

      let att = attache;
      let filenameAtt = attache.split("/").pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let matchAtt = /\.(\w+)$/.exec(filenameAtt);
      let typeAtt = matchAtt ? `application/${matchAtt[1]}` : `application`;

      var formData = new FormData();
      formData.append("title", values.title);
      formData.append("publication_date", values.date);
      formData.append("pages", values.page);
      formData.append("author", values.author);
      formData.append("isbn", values.isbn);
      formData.append("thumbnail", { uri: localUri, name: filename, type });
      formData.append("attache", {
        uri: att,
        name: filenameAtt,
        type: typeAtt,
      });
      formData.append("status", "");

      const res = await API.post("/literature", formData, config);

      setVisible(true);
      setAttache("");
      setThumbnail("");
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.error.message);
      setVisible(true);
    }
  });

  const SUPPORTED_FORMATS_BOOK = ["application/pdf", "application/epub+zip"];
  return (
    <>
      <Header
        centerComponent={{
          text: "add Literature",
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
      <ScrollView style={{ backgroundColor: color.primary }}>
        <View style={styles.container}>
          <Formik
            initialValues={{
              title: "",
              date: "",
              page: "",
              isbn: "",
              author: "",
              thumbnail: "",
              attache: "",
            }}
            onSubmit={(values, { resetForm }) => {
              addBook(values);
              resetForm({ values: "" });
            }}
            validationSchema={yup.object().shape({
              title: yup.string().required().min(8),
              date: yup.string().required().min(3),
              page: yup.number().typeError().required().min(1),
              isbn: yup.number().typeError().required().min(11),
              author: yup.string().required().min(3),
              // thumbnail: yup
              //   .mixed()
              //   .required()
              //   .test(
              //     "fileFormat",
              //     "Sorry only accept image filetype",
              //     (value) =>
              //       value && SUPPORTED_FORMATS_IMAGE.includes(value.type)
              //   ),
              // attache: yup
              //   .mixed()
              //   .required()
              //   .test(
              //     "fileFormat",
              //     "Sorry only accept epub/pdf filetype",
              //     (value) =>
              //       value && SUPPORTED_FORMATS_BOOK.includes(value.type)
              //   ),
            })}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              handleSubmit,
              setFieldValue,
            }) => (
              <>
                <TextInput
                  placeholder="Title"
                  value={values.title}
                  onChangeText={handleChange("title")}
                  errorMessage={touched.title && errors.title && errors.title}
                  onBlur={() => setFieldTouched("title")}
                />
                <TextInput
                  placeholder="Publication Date"
                  value={values.date}
                  onChangeText={handleChange("date")}
                  errorMessage={touched.date && errors.date && errors.date}
                  onBlur={() => setFieldTouched("date")}
                />
                <TextInput
                  placeholder="Page"
                  value={values.page}
                  onChangeText={handleChange("page")}
                  errorMessage={touched.page && errors.page && errors.page}
                  onBlur={() => setFieldTouched("page")}
                />
                <TextInput
                  placeholder="ISBN"
                  value={values.isbn}
                  onChangeText={handleChange("isbn")}
                  errorMessage={touched.isbn && errors.isbn && errors.isbn}
                  onBlur={() => setFieldTouched("isbn")}
                />
                <TextInput
                  placeholder="Author"
                  value={values.author}
                  onChangeText={handleChange("author")}
                  errorMessage={
                    touched.author && errors.author && errors.author
                  }
                  onBlur={() => setFieldTouched("author")}
                />
                <CustomButton
                  color={color.white}
                  //bgColor={color.secondary}
                  width={width - 40}
                  style={{
                    height: 50,
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    borderColor: color.white,
                    borderWidth: 2,
                    marginBottom: 20,
                  }}
                  onPress={() => _pickDocument()}
                >
                  {attache !== "" ? attache.split("/").pop() : "Add Attachment"}
                </CustomButton>
                <CustomButton
                  color={color.white}
                  //bgColor={color.secondary}
                  width={width - 40}
                  style={{
                    height: 50,
                    backgroundColor: "rgba(210, 210, 210, 0.25)",
                    borderColor: color.white,
                    borderWidth: 2,
                    marginBottom: 20,
                  }}
                  onPress={() => _pickImage()}
                >
                  {thumbnail !== ""
                    ? thumbnail.split("/").pop()
                    : "Add Thumbnail"}
                </CustomButton>
                <CustomButton
                  color={color.white}
                  bgColor={color.secondary}
                  width={width - 40}
                  style={{ height: 40, marginTop: 10 }}
                  onPress={handleSubmit}
                >
                  add Literature
                </CustomButton>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
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
        <>
          <Text
            style={{
              color: color.white,
              fontSize: 18,
              fontFamily: "Metropolis-Bold",
              textAlign: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            {message
              ? message
              : "Thank you for adding your own literature to our website, please wait 1 x 24 hours to verify"}
          </Text>
        </>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: color.primary,
    padding: 10,
    paddingTop: 10,
  },
  txtHeader: {
    fontFamily: "Metropolis-Bold",
    color: color.white,
    fontSize: 36,
    marginLeft: 30,
    marginBottom: 15,
  },

  txtAccount: {
    color: color.white,
    fontFamily: "Metropolis-Regular",
    textAlign: "center",
    fontSize: 16,
    marginTop: 25,
  },
  txtBottom: {
    fontFamily: "Metropolis-Regular",
    color: color.secondary,
  },
});
