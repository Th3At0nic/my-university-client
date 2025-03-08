import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    errorSource: { path: string; message: string }[];
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

// export type TResponse = {
//   data: {
//     code: string;
//     createdAt: string;
//     endMonth: string;
//     name: string;
//     startMonth: string;
//     updatedAt: string;
//     year: string;
//     __v: number;
//     _id: string;
//   };
//   message: string;
//   success: boolean;
//   error?: TError;
// };
