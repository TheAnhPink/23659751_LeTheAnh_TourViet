import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={compact ? styles.compactCard : styles.card}
      onPress={() => navigation.navigate("Detail", { id: tour.id })}
    >
      <View style={compact ? undefined : styles.imageWrap}>
        <Image
          source={{ uri: tour.image }}
          style={compact ? styles.compactImage : styles.image}
        />
        <TouchableOpacity
          testID="fav-btn"
          style={compact ? styles.compactHeart : styles.heart}
          onPress={() => onToggleFavorite(tour.id, !tour.isFavorite)}
        >
          <Text style={styles.heartText}>{tour.isFavorite ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
      </View>

      <View style={compact ? undefined : styles.info}>
        <Text
          numberOfLines={1}
          style={compact ? styles.compactName : styles.name}
        >
          {tour.name}
        </Text>

        {!compact && <Text style={styles.city}>{tour.city}</Text>}

        {!compact && (
          <Text style={styles.date}>
            {formatDate(tour.departure)} · {tour.days} ngày
          </Text>
        )}

        <Text style={styles.price}>{price}</Text>

        {!compact && (
          <Text style={[styles.seat, tour.seats <= 3 && styles.seatRed]}>
            {getSeatLabel(tour.seats)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

//3b
export default React.memo(TourItem);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  imageWrap: { justifyContent: "center" },
  image: { width: 90, height: 90, borderRadius: 8 },
  info: { flex: 1, marginLeft: 10 },
  name: { fontWeight: "bold", fontSize: 15 },
  city: { color: "#666", fontSize: 13, marginTop: 2 },
  date: { color: "#666", fontSize: 13, marginTop: 2 },
  price: { color: "#e11d48", fontWeight: "bold", marginTop: 4 },
  seat: { fontSize: 12, color: "#333", marginTop: 2 },
  seatRed: { color: "red" },
  heart: { position: "absolute", top: 0, right: 0, padding: 4 },
  heartText: { fontSize: 22 },
  compactCard: { width: 160, marginRight: 10 },
  compactImage: { width: "100%", aspectRatio: 4 / 3, borderRadius: 8 },
  compactHeart: { position: "absolute", top: 6, right: 6 },
  compactName: { fontWeight: "bold", marginTop: 6 },
});