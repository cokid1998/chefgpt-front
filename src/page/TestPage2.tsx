// useMutation실험을 위한 테스트 페이지 ver.1

import axios from "axios";
import {
  useMutation,
  type UseMutationOptions,
  type DefaultError,
} from "@tanstack/react-query";
import { type AxiosResponse } from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ⚠️ 아래 타입은 useCustomMutation에서 mutationFn을 사용하지 않아도 에러를 일으키지 않는 문제가 있음
type CustomUseMutationOptions<
  TData,
  TError = DefaultError,
  TVariables = void,
> = UseMutationOptions<AxiosResponse<TData>, TError, TVariables>;

interface TestRes {
  title: string;
  body: string;
  userId: number;
}

// 아래 제네릭 타입으로 응답데이터, onSuccess, onSettled의 인자에 타입이 전파됨
const useCustomMutation = <TData, TError, TVariables>(
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

const usePostTest = (options?: CustomUseMutationOptions<TestRes>) =>
  useCustomMutation({
    mutationFn: postTest,
    ...options,
  });

export default function TestPage2() {
  const { mutate, data } = usePostTest({
    onSuccess: (data) => console.log(data),
    onSettled: (data) => console.log(data),
  });

  return <div></div>;
}

// 위 코드의 문제점
// 1. useMutation을 사용할 때 mutationFn을 넣지않아도 에러를 반환해주지 않음
