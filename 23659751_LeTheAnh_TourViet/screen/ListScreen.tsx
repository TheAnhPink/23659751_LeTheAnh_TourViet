import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TourItem from "../components/TourItem ";
import { groupByCity, Tour } from "../utils/tour";

const API_URL = "https://6abb550db2118ed7abb84013.mockapi.io/tours";

export default function ListScreen() {
  const [dsTour, setDsTour] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState("");

  //2c
  const getData = async () => {
    const resp = await fetch(API_URL);
    const data = await resp.json();
    setDsTour(data);
  };

  useEffect(() => {
    const load = async () => {
      await getData();
      setLoading(false);
    };
    load();
  }, []);

  //6a
  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    if (!kw) return dsTour;
    return dsTour.filter((t) => t.name.toLowerCase().includes(kw));
  }, [dsTour, keyword]);

  //2a
  const sections = useMemo(() => groupByCity(filtered), [filtered]);

  //4c
  const favorites = useMemo(() => dsTour.filter((t) => t.isFavorite), [dsTour]);

  //5a, 5b, 5c
  const onToggleFavorite = async (id: string, next: boolean) => {
    const old = dsTour;
    setDsTour((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFavorite: next } : t))
    );
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: next }),
      });
      if (!res.ok) throw new Error("PUT failed");
    } catch (e) {
      setDsTour(old);
      Alert.alert("Lỗi", "Không cập nhật được yêu thích");
    }
  };

  //6b
  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  //4c
  const renderHeader = () => (
    <View style={{ paddingBottom: 10 }}>
      <Text style={styles.favTitle}>Tour yêu thích ({favorites.length})</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyFav}>Chưa có tour yêu thích</Text>
      ) : (
        <FlatList
          data={favorites}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          renderItem={({ item }) => (
            <TourItem
              tour={item}
              compact
              onPress={(t) =>
                window.alert(`${t.name}, ${t.departure} · ${t.days} ngày · ${t.price} đ`)
              }
              onToggleFavorite={onToggleFavorite}
            />
          )}
        />
      )}
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* 1c */}
        <View style={styles.header}>
          <Text style={styles.title}>Tour Việt</Text>
          <Text style={styles.sub}>23659751 – Lê Thế Anh</Text>
          <TextInput
            style={styles.input}
            placeholder="Tìm tour theo tên..."
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>

        {/* 2c */}
        {loading ? (
          <ActivityIndicator size="large" color="red" style={{ marginTop: 50 }} />
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            stickySectionHeadersEnabled={true}
            ListHeaderComponent={renderHeader}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>
                {section.title} · {section.data.length} tour
              </Text>
            )}
            renderItem={({ item }) => (
              <TourItem
                tour={item}
                onPress={(t) =>
                  Alert.alert(
                    t.name,
                    `Khởi hành: ${t.departure}\n${t.days} ngày\nGiá: ${t.price.toLocaleString("vi-VN")} đ`
                  )
                }
                onToggleFavorite={onToggleFavorite}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>Không tìm thấy tour phù hợp</Text>
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", color: "red" },
  sub: { fontSize: 13, color: "#555", marginTop: 2 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 8,
    marginTop: 10,
  },
  sectionHeader: {
    backgroundColor: "#eee",
    padding: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
  favTitle: { fontWeight: "bold", fontSize: 16, paddingHorizontal: 12, marginTop: 8 },
  emptyFav: { paddingHorizontal: 12, color: "#888", marginTop: 4 },
  empty: { textAlign: "center", marginTop: 30, color: "#888" },
});