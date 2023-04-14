import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React from "react";

interface CategoryProps {
  imgUrl: string;
  title: string;
}

const Category = ({ imgUrl, title }: CategoryProps) => {
  return (
    <Pressable className="relative mr-2">
      <Image source={{ uri: imgUrl }} className="h-20 w-20 rounded" />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </Pressable>
  );
};

export default Category;
