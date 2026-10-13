import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { formatDate, getSeatLabel, Tour } from '../utils/tour';

const API_URL = 'https://6abb550db2118ed7abb84013.mockapi.io/tours';

type Props = {
  route: {
    params: {
      id: string;
    };
  };
};

function Detail({ route }: Props) {
  const { id } = route.params;
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await fetch(`https://6abb550db2118ed7abb84013.mockapi.io/tours/${id}`);
        const data = await resp.json();
        setTour(data);
      } catch (e) {
        console.log('Lỗi tải chi tiết:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="red" style={{ marginTop: 50 }} />
    );
  }

  if (!tour) {
    return <Text style={styles.empty}>Không tìm thấy tour</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: tour.image }} style={styles.image} />

      <View style={styles.body}>
        <Text style={styles.name}>{tour.name}</Text>
        <Text style={styles.city}>📍 {tour.city}</Text>

        <Text style={styles.date}>
          🗓 {formatDate(tour.departure)} · {tour.days} ngày
        </Text>

        <Text style={styles.price}>
          {tour.price.toLocaleString('vi-VN')} đ
        </Text>

        <Text style={[styles.seat, tour.seats <= 3 && styles.seatRed]}>
          {getSeatLabel(tour.seats)}
        </Text>

        <Text style={styles.fav}>
          {tour.isFavorite ? '❤️ Đã yêu thích' : '🤍 Chưa yêu thích'}
        </Text>
      </View>
    </ScrollView>
  );
}

export default Detail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', aspectRatio: 4 / 3 },
  body: { padding: 16 },
  name: { fontSize: 22, fontWeight: 'bold' },
  city: { fontSize: 15, color: '#666', marginTop: 6 },
  date: { fontSize: 15, color: '#666', marginTop: 6 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#e11d48', marginTop: 12 },
  seat: { fontSize: 14, color: '#333', marginTop: 6 },
  seatRed: { color: 'red', fontWeight: 'bold' },
  fav: { fontSize: 14, marginTop: 12 },
  empty: { textAlign: 'center', marginTop: 50, color: '#888' },
});