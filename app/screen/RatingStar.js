import React from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const RatingStars = ({ rating }) => {
  const getStarRatings = (ratin) => {
    const fullStars = Math.floor(ratin);
    const decimalPart = ratin % 1;
    const halfStars = decimalPart >= 0.1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    return { fullStars, halfStars, emptyStars };
  };

  const { fullStars, halfStars, emptyStars } = getStarRatings(rating);
  console.log("full", fullStars, halfStars, emptyStars);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {/* Render Full Stars */}
      {Array.from({ length: fullStars }, (_, index) => (
        <FontAwesome
          name="star"
          key={`full-${index}`}
          color="#b4690e"
          size={18}
        />
      ))}
      {/* Render Half Star */}
      {halfStars > 0 && (
        <FontAwesome
          name="star-half-empty"
          color="#b4690e"
          size={18}
        />
      )}
      {/* Render Empty Stars */}
      {Array.from({ length: emptyStars }, (_, index) => (
        <FontAwesome
          name="star-o" // Use 'star-o' for empty stars
          key={`empty-${index}`}
          color="gray"
          size={18}
        />
      ))}
    </View>
  );
};

export default RatingStars;
