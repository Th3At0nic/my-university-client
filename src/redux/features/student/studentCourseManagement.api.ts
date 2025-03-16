import {
  TEnrolledCourse,
  TOfferedCourseForStudent,
  TQueryParam,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const studentCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourseForStudent: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (
        response: TResponseRedux<TOfferedCourseForStudent[]>
      ) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    enrollCourse: builder.mutation({
      query: (data) => {
        return {
          url: "/enrolled-courses/create-enrolled-course",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["offeredCourse"],
    }),
    getAllEnrolledCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["enrolledCourses"],
      transformResponse: (response: TResponseRedux<TEnrolledCourse[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    getMyEnrolledCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/enrolled-courses/my-enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["enrolledCourses"],
      transformResponse: (response: TResponseRedux<TEnrolledCourse[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
  }),
});

export const {
  useGetAllOfferedCourseForStudentQuery,
  useEnrollCourseMutation,
  useGetAllEnrolledCoursesQuery,
  useGetMyEnrolledCoursesQuery,
} = studentCourseManagementApi;
