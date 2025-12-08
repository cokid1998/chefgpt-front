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
// useQuery의 반환타입이 unknown으로 추론되는 문제가 있음
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

// 내가 원했던 것
// Network Layer와 UI Layer를 분리시키는것 즉, UI Layer에서 useQuery의 옵션을 자유롭게 넣을 수 있게 하는것
// options객체를 넘겼을 때 select유무에 따라 useQuery의 리턴타입을 자동으로 추론시키는것
// 만약 내가 customUseQuery라는 함수를 만들었을 때 queryKey와 queryFn을 넣지 않았을 때 에러를 발생시키는것

/** 
정리
  useQuery의 data의 리턴타입은 "기본적으로" queryFn함수의 리턴타입으로 결정된다.
  하지만 useQuery의 인자에 select함수가 존재하는경우 select함수의 리턴타입으로 결정된다.

  useQuery의 원본 타입은 아래와 같다. (오버로드 함수라서 2개가 더 있다.)
  ⭐️declare function useQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): UseQueryResult<NoInfer<TData>, TError>;
  declare function useQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): DefinedUseQueryResult<NoInfer<TData>, TError>;
  declare function useQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): UseQueryResult<NoInfer<TData>, TError>;

  반환타입 관련 타입을 설명하기 위해 간추린 타입 (설명과 연관없는 타입은 모두 생략)
  declare function useQuery
  useQuery함수의 제네릭타입: <TQueryFnData = unknown, ⭐️TData = TQueryFnData>
  useQuery함수의 인자타입: (options: UseQueryOptions<TQueryFnData, TData>)
  useQuery함수의 리턴타입: UseQueryResult<TData>; <- UseQueryResult의 제네릭인 TData가 응답 데이터 타입이 됨

  ⭐️알아야할것
  1. useQuery data의 타입은 "TData", queryFn의 리턴타입은 "TQueryFnData"
  2. TData의 초기타입은 ⭐️TQueryFnData!!, 즉 기본적으로 useQuery data타입 = queryFn리턴타입
  3. UseQueryOptions안에 있는 select의 타입 (정확히는 QueryObserverOptions라는 타입안에 있지만 UseQueryOptions에 있다고해도무방)
  3-1. select?: (data: TQueryData) => TData;

  select를 사용하지않을경우
  - ⭐️알아야할것2에 따라 useQuery data타입은 queryFn의 리턴타입이 됨

  select를 사용할경우
  - ⭐️알아야할것3-1에 따라 TData는 select함수의 리턴값에따라 타입이 정해짐
  - select함수의 리턴타입에 따라 TData의 타입이 변하는 이유는 TS의 제네릭 함수의 자동 추론 개념 (아래 예시코드)

  function transform
  <Input, Output>
  (input: Input, converter: (value: Input) => Output)
  : Output
  {
    return converter(input);
  }

  1️⃣ 제네릭을 명시적으로 지정
  const result1 = transform<number, string>(123, (value) => value.toString());
  result1: string

  2️⃣ 제네릭을 지정하지 않음 (자동 추론)
  const result2 = transform(123, (value) => value.toString());
  TypeScript가 자동으로 추론:
  - Input = number (첫 번째 인자 123의 타입)
  - Output = string (converter 함수의 반환 타입)
  result2: string

  3️⃣ 다른 타입으로 시도
  const result3 = transform("hello", (value) => value.length);
  TypeScript가 자동으로 추론:
  - Input = string
  - Output = number
  result3: number

  ✅ 확인: 이 세 가지 방식 모두 동일하게 작동한다!
  1번은 명시적이고, 2번과 3번은 자동 추론이지만 타입은 같다.

  ❓ 추가로 궁금한점
  UseQueryOptions타입 정확히말하면 QueryObserverOptions타입에서
  TQueryFnData과 TQueryData를 나눈 이유는 뭘까?

*/
