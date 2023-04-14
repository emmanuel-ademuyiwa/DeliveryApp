import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../../components/Categories/Categories";
import FeaturedRow from "../../components/FeaturedRow/FeaturedRow";
import sanityClient from "../../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState<any>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `       *[_type == "featured"] {
                ...,
                restaurant[]->{
                  ...,
                  dishes[]->
                }
              }
      `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <Image
              source={{ uri: "https://links.papareact.com/wru" }}
              style={styles.imageIcon}
            />
            <View>
              <Text style={styles.deliveryText}>Deliver now!</Text>
              <View style={styles.currentLocationContainer}>
                <Text style={styles.currentLocation}>Current Location</Text>
                <Text>
                  <ChevronDownIcon size={18} color="#00CCBB" />
                </Text>
              </View>
            </View>
          </View>
          <View>
            <UserIcon size={35} color="#00CCBB" />
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View
            className="bg-gray-200 p-3 flex-1 space-x-2 rounded"
            style={styles.searchInputContainer}
          >
            <MagnifyingGlassIcon size={20} color="gray" />
            <TextInput
              keyboardType="default"
              style={styles.searchInput}
              placeholder="Restaurants and cuisines"
            />
          </View>
          <AdjustmentsVerticalIcon size={30} color="#00CCBB" />
        </View>
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={styles.innerContainer}
      >
        {/* Categories */}
        <Categories />

        {/* Featured Rows */}
        {featuredCategories?.map((category: any) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 150,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftHeader: {
    flexDirection: "row",
  },
  imageIcon: {
    width: 38,
    height: 38,
    marginRight: 8,
    backgroundColor: "#cccccc",
    borderRadius: 20,
  },
  deliveryText: {
    color: "gray",
    fontSize: 12,
    fontWeight: "bold",
  },
  currentLocationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  icon: {
    marginTop: 10,
  },
  currentLocation: {
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 3,
  },
  searchContainer: {
    flexDirection: "row",
    paddingTop: 12,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  searchInputContainer: {
    padding: 6,
    flexDirection: "row",
    height: 44,
    alignItems: "center",
    marginRight: 12,
  },
  searchInput: {
    width: "90%",
  },
});

export default HomeScreen;
