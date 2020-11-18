import React from "react";
import { View, Text, Dimensions } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import color from "../../utils/color";

const width = Dimensions.get("window").width;

export const SkeletonCard = () => {
  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <SkeletonPlaceholder
        backgroundColor={color.triple}
        highlightColor={color.triple}
      >
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          width={width - 20}
        >
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={width / 2 - 20}
              height={width / 2 - 20}
              borderRadius={15}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={width / 2 - 20}
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              flexDirection="row"
              justifyContent="space-between"
              width={width / 2 - 20}
            >
              <SkeletonPlaceholder.Item
                marginTop={6}
                width={80}
                height={20}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                marginTop={6}
                width={60}
                height={20}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={width / 2 - 20}
              height={width / 2 - 20}
              borderRadius={15}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={width / 2 - 20}
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              flexDirection="row"
              justifyContent="space-between"
              width={width / 2 - 20}
            >
              <SkeletonPlaceholder.Item
                marginTop={6}
                width={80}
                height={20}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                marginTop={6}
                width={60}
                height={20}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          width={width - 20}
          marginTop={10}
        >
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={width / 2 - 20}
              height={width / 2 - 20}
              borderRadius={15}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={width / 2 - 20}
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              flexDirection="row"
              justifyContent="space-between"
              width={width / 2 - 20}
            >
              <SkeletonPlaceholder.Item
                marginTop={6}
                width={80}
                height={20}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                marginTop={6}
                width={60}
                height={20}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={width / 2 - 20}
              height={width / 2 - 20}
              borderRadius={15}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={width / 2 - 20}
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              flexDirection="row"
              justifyContent="space-between"
              width={width / 2 - 20}
            >
              <SkeletonPlaceholder.Item
                marginTop={6}
                width={80}
                height={20}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                marginTop={6}
                width={60}
                height={20}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};
