// useMutation실험을 위한 테스트 페이지 ver.2

import axios, { type AxiosResponse } from "axios";
import {
  useMutation,
  type DefaultError,
  type UseMutationOptions,
  type MutationFunction,
} from "@tanstack/react-query";

interface TestRes {
  title: string;
  body: string;
  userId: number;
}

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ⚠️ 아래 타입은 useCustomMutation에서 mutationFn을 사용하지 않아도 에러를 일으키지 않는 문제가 있음
// type CustomUseMutationOptions<
//   TData,
//   TError = DefaultError,
//   TVariables = void,
// > = UseMutationOptions<AxiosResponse<TData>, TError, TVariables>;

// ✅ 이 타입과 usePostTest의 인자를 적절히 사용해야 useCustomMutation에서 mutationFn을 사용하지않으면 에러를 일으킴
// 이 타입은 react-query에서 제공하는 UseMutationOptions를 활용하는 wrapper타입임
// error와 variables타입은 일단 기본타입으로, 최우선순위는 TData타입을 알맞게 커스텀하는것
// TData타입은 API요청후 응답데이터, onSuccess, onSettled의 첫번째 인자의 타입에 적용이됨
type CustomUseMutationOptions<
  TData,
  TError = DefaultError,
  TVariables = void,
> = Omit<
  UseMutationOptions<AxiosResponse<TData>, TError, TVariables>,
  "mutationFn"
> & {
  mutationFn: MutationFunction<AxiosResponse<TData>, TVariables>;
};

const useCustomMutation = <TData, TError = DefaultError, TVariables = void>(
  options: CustomUseMutationOptions<TData, TError, TVariables>,
) =>
  useMutation({
    ...options,
  });

const postTest = () =>
  API.post("https://jsonplaceholder.typicode.com/posts", {
    title: "foo",
    body: "bar",
    userId: 1,
  });

const usePostTest = (
  options?: Omit<CustomUseMutationOptions<TestRes>, "mutationFn">,
) =>
  useCustomMutation<TestRes>({
    mutationFn: postTest,
    ...options,
  });

export default function UseMutationStudyVer2() {
  const { mutate, data } = usePostTest({
    onSuccess: (data) => console.log(data),
    onSettled: (data) => console.log(data),
  });

  return (
    <div>
      <button onClick={() => mutate()}>test</button>
    </div>
  );
}

// TestPage2.tsx에 있는 문제점인 mutationFn을 넣지않으면 에러를 일으키지않는 문제를 해결한 코드
// 하지만 사용할 때 options인자의 타입을 Omit으로 정의하는게 불편함
// 타입 체계가 너무복잡함

// 결론: 그냥 사용하는곳에서 useMutation을 사용하는게 낫지않을까..?
