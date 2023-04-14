import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../../sanity";
import { useNavigation } from "@react-navigation/native";

interface RestuarantCardProps {
  id: string;
  imgUrl: string;
  title: string;
  rating: number;
  genre: string;
  address: string;
  short_description: string;
  dishes: string[];
  long: string;
  lat: string;
}

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}: RestuarantCardProps) => {
  const navigation:any = useNavigation();

  const restaurantScreen = () => {
    navigation.navigate("Restaurant", {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    });
  };

  return (
    <Pressable
      onPress={restaurantScreen}
      className="bg-white mr-3 shadow"
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="w-64 h-32 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2 ">{title}</Text>
        <View className="flex-row pt-2 items-center space-x-1">
          <StarIcon color={"green"} opacity={0.5} size={20} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> &bull; {genre}
          </Text>
        </View>
        <View className="flex-row pt-2 items-center space-x-1">
          <MapPinIcon color={"gray"} opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500">
            Nearby &bull; {address}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RestaurantCard;
