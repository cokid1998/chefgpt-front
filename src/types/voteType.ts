export interface VoteType {
  id: number;
  title: string;
  description: string;
  optionA: string;
  optionB: string;
  startDate: string; // 서버에서는 Date타입으로 보내지만 Json직렬화때문에 String타입으로 변환되어 들어온다.
  endDate: string; // 서버에서는 Date타입으로 보내지만 Json직렬화때문에 String타입으로 변환되어 들어온다.
}
