import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

export interface DISH_ROW_PROPS {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const DishRow = ({ id, name, description, price, image }: DISH_ROW_PROPS) => {
  const [isPressed, setIsPressed] = useState(false);
  const toggleIsPressed = () => setIsPressed(!isPressed);
  return (
    <>
      <TouchableOpacity
        onPress={toggleIsPressed}
        className={`bg-white p-4 border border-gray-200 flex-row ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-1">
          <Text className="text-lg mb-1">{name}</Text>
          <Text className="text-gray-400">{description}</Text>
          <Text className="text-gray-400 mt-2">
            <Currency quantity={price} currency="NGN" />
          </Text>
        </View>
        <View>
          <Image
            style={styles.imgStyle}
            source={{ uri: image }}
            className="w-20 h-20 rounded bg-gray-300 p-4 "
          />
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-2">
            <TouchableOpacity>
              <MinusCircleIcon size={40} color="#00CCBB" />
            </TouchableOpacity>
            <Text>0</Text>
            <TouchableOpacity>
              <PlusCircleIcon size={40} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imgStyle: {
    borderWidth: 1,
    borderColor: "#F3F3F4",
  },
});

export default DishRow;
