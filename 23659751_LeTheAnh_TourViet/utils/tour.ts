export type Tour = {
  id: string;
  name: string;
  city: string;
  days: number;
  price: number;
  seats: number;
  departure: string;
  image: string;
  isFavorite: boolean;
};

//2a
export function groupByCity(tours: Tour[]) {
  const map: any = {};
  tours.forEach((t) => {
    if (!map[t.city]) map[t.city] = [];
    map[t.city].push(t);
  });

  const result = Object.keys(map).map((city) => {
    const data = map[city].sort((a: Tour, b: Tour) =>
      a.departure.localeCompare(b.departure)
    );
    return { title: city, data };
  });

  result.sort((a, b) => a.title.localeCompare(b.title));
  return result;
}

//3c
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

//3c
export function getSeatLabel(seats: number) {
  if (seats <= 0) return "Hết chỗ";
  if (seats <= 3) return `Chỉ còn ${seats} chỗ`;
  return `Còn ${seats} chỗ`;
}