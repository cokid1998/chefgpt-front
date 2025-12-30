export interface Profile {
  id: number;
  createdAt: Date;
  email: string;
  name: string;
  thumbnail: string;
  authProvider: "KAKAO" | "LOCAL";
}
