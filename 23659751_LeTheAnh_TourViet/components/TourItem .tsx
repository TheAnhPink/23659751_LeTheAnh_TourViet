import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDate, getSeatLabel, Tour } from "../utils/tour";

//3a
type TourItemProps = {
  tour: Tour;
  compact?: boolean;
  onPress: (tour: Tour) => void;
  onToggleFavorite: (id: string, next: boolean) => void;
};

//3a, 4a, 4b
function TourItem({ tour, compact = false, onPress, onToggleFavorite }: TourItemProps) {
  const price = tour.price.toLocaleString("vi-VN") + " đ";

  //4b
  if (compact) {
    return (
      <TouchableOpacity style={styles.compactCard} onPress={() => onPress(tour)}>
        <View>
          <Image source={{ uri: tour.image }} style={styles.compactImage} />
          <TouchableOpacity
            testID="fav-btn"
            style={styles.compactHeart}
            onPress={() => onToggleFavorite(tour.id, !tour.isFavorite)}
          >
            <Text style={styles.heartText}>{tour.isFavorite ? "❤️" : "🤍"}</Text>
          </TouchableOpacity>
        </View>
        <Text numberOfLines={1} style={styles.compactName}>{tour.name}</Text>
        <Text style={styles.price}>{price}</Text>
      </TouchableOpacity>
    );
  }

  //3d, 4a
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(tour)}>
      <Image source={{ uri: tour.image }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>{tour.name}</Text>
        <Text style={styles.city}>{tour.city}</Text>
        <Text style={styles.date}>
          {formatDate(tour.departure)} · {tour.days} ngày
        </Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={[styles.seat, tour.seats <= 3 && styles.seatRed]}>
          {getSeatLabel(tour.seats)}
        </Text>
      </View>
      <TouchableOpacity
        testID="fav-btn"
        style={styles.heart}
        onPress={() => onToggleFavorite(tour.id, !tour.isFavorite)}
      >
        <Text style={styles.heartText}>{tour.isFavorite ? "❤️" : "🤍"}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

//3b
export default React.memo(TourItem);

const styles = StyleSheet.create({
  //4a
  card: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  image: { width: 90, height: 90, borderRadius: 8 },
  info: { flex: 1, marginLeft: 10 },
  name: { fontWeight: "bold", fontSize: 15 },
  city: { color: "#666", fontSize: 13, marginTop: 2 },
  date: { color: "#666", fontSize: 13, marginTop: 2 },
  price: { color: "#e11d48", fontWeight: "bold", marginTop: 4 },
  seat: { fontSize: 12, color: "#333", marginTop: 2 },
  seatRed: { color: "red" },
  heart: { justifyContent: "center", paddingLeft: 8 },
  heartText: { fontSize: 22 },

  //4b
  compactCard: { width: 160, marginRight: 10 },
  compactImage: { width: "100%", aspectRatio: 4 / 3, borderRadius: 8 },
  compactHeart: { position: "absolute", top: 6, right: 6 },
  compactName: { fontWeight: "bold", marginTop: 6 },
});