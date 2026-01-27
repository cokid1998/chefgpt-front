export interface Profile {
  id: number;
  createdAt: Date;
  email: string;
  nickname: string;
  thumbnail: string;
  authProvider: "KAKAO" | "LOCAL";
}
