import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { CustomButton, TextInput, CustomPicker } from "../../components";
import color from "../../utils/color";
import { Header, Icon } from "react-native-elements";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const AddLiterature = (props) => {
  const SUPPORTED_FORMATS_IMAGE = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
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
            onSubmit={(values) => alert(JSON.stringify(values))}
            validationSchema={yup.object().shape({
              title: yup.string().required().min(8),
              date: yup.string().required().min(3),
              page: yup.number().typeError().required().min(1),
              isbn: yup.number().typeError().required().min(11),
              author: yup.string().required().min(3),
              thumbnail: yup
                .mixed()
                .required()
                .test(
                  "fileFormat",
                  "Sorry only accept image filetype",
                  (value) =>
                    value && SUPPORTED_FORMATS_IMAGE.includes(value.type)
                ),
              attache: yup
                .mixed()
                .required()
                .test(
                  "fileFormat",
                  "Sorry only accept epub/pdf filetype",
                  (value) =>
                    value && SUPPORTED_FORMATS_BOOK.includes(value.type)
                ),
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
                  bgColor={color.secondary}
                  width={width - 40}
                  style={{ height: 40 }}
                  onPress={handleSubmit}
                >
                  add Literature
                </CustomButton>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
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
