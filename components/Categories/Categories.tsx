import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "../Category/Category";
import sanityClient, { urlFor } from "../../sanity";

const Categories = () => {
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
            *[_type == "category"]
          `
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category: any) => (
        <Category
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
