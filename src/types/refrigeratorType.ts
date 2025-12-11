export type CategoryKrString =
  | "채소"
  | "육류"
  | "유제품"
  | "해산물"
  | "과일"
  | "조미료"
  | "기타"
  | "곡물";

export interface FoodCategory {
  id: number;
  name: CategoryKrString;
}

export type LocationType = "COLD" | "FROZEN" | "ROOM_TEMP";

export interface FoodType {
  id: number;
  name: string;
  location: LocationType;
  quantity: number;
  unit: string;
  expiration_date: Date;
  memo: string;
  category: FoodCategory;
}
