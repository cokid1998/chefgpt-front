export interface FoodCategory {
  id: number;
  name: string;
}

export interface FoodType {
  id: number;
  name: string;
  location: "COLD" | "FROZEN" | "ROOM_TEMP";
  quantity: number;
  unit: string;
  expiration_date: Date;
  memo: string;
  category: FoodCategory;
}
