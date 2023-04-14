import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import sanityClient from "../../sanity";

interface FeaturedRowProps {
  id: string;
  title: string;
  description: string;
}

const FeaturedRow = ({ id, title, description }: FeaturedRowProps) => {
  const [restaurants, setRestaurants] = useState<any>([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `       *[_type == "featured" && _id == $id] {
                ...,
                restaurant[]->{
                  ...,
                  dishes[]->,
                  type->{
                    name
                  }
                }
              }[0]
      `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurant);
      });
  }, [id]);

  return (
    <View>
      <View className="mt-4 flex-row  items-center justify-between ">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon size={20} color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500">{description}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restaurants.map((restaurant: any) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
