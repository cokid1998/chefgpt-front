// useQuery 실험을 위한 테스트 페이지
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

interface DataType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface DataWithUpper extends DataType {
  upper: string;
}

// 아래 타입은 queryKey와 queryFn을 사용하지않았을 때 에러를 발생시키는 문제는 해결했지만
// useQuery의 반환값이 unknown으로 추론되는 문제가 있음
// type CustomUseQueryOptions = Omit<UseQueryOptions, "queryKey" | "queryFn">;

// 아래 타입은 Options객체의 queryFn리턴타입과 select함수의 리턴타입을 지정해서
// 위 타입의 문제점이였던 useQuery의 타입이 unknown으로 추론되는 문제점을 해결한 타입임
type CustomUseQueryOptions = Omit<
  UseQueryOptions<AxiosResponse<DataType>, Error, DataWithUpper>,
  "queryKey" | "queryFn"
>;

const getTest = () =>
  API.get<DataType>("https://jsonplaceholder.typicode.com/todos/1");

const useGetTest = (options?: CustomUseQueryOptions) =>
  useQuery({
    queryKey: ["customTypeSetting"],
    queryFn: getTest,
    ...options,
  });
// 위코드는 hooks/API/**/*.ts에 위치
// Network Layer

/* -------------------------------------------------------------------------------------------- */

// UI Layer
export default function UseQueryTestPage() {
  const { data: defaultTypeSettingData } = useQuery({
    queryKey: ["defaultTypeSetting"],
    queryFn: getTest,
    select: (data) => ({ ...data.data, upper: data.data.title.toUpperCase() }),
  });

  const { data: customTypeSettingData } = useGetTest({
    select: (data) => ({ ...data.data, upper: data.data.title.toUpperCase() }),
    enabled: true,
  });

  return (
    <div>
      <div>{defaultTypeSettingData?.title}</div>
      <div>{customTypeSettingData?.title}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------- */

// 내가 원하는 것
// options객체를 넘겼을 때 select유무에 따라 useQuery의 리턴타입을 자동으로 추론시키는것
// 만약 내가 customUseQuery라는 함수를 만들었을 때 queryKey와 queryFn을 넣지 않았을 때 에러를 발생시키는것

// 궁금증: 제네릭이라는건 직접 써야하는거 아닌가????
// 해답: 제네릭 함수의 자동 추론

function transform<Input, Output>(
  input: Input,
  converter: (value: Input) => Output,
): Output {
  return converter(input);
}

// 1️⃣ 제네릭을 명시적으로 지정
const result1 = transform<number, string>(123, (value) => value.toString());
// result1: string

// 2️⃣ 제네릭을 지정하지 않음 (자동 추론)
const result2 = transform(123, (value) => value.toString());
// TypeScript가 자동으로 추론:
// - Input = number (첫 번째 인자 123의 타입)
// - Output = string (converter 함수의 반환 타입)
// result2: string

// 3️⃣ 다른 타입으로 시도
const result3 = transform("hello", (value) => value.length);
// TypeScript가 자동으로 추론:
// - Input = string
// - Output = number
// result3: number

// ✅ 확인: 이 세 가지 방식 모두 동일하게 작동한다!
// 1번은 명시적이고, 2번과 3번은 자동 추론이지만 타입은 같다.
