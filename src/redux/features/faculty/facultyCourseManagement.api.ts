import { TEnrolledCourse, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const facultyCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
    addMarks: builder.mutation({
      query: (data) => {
        return {
          url: "/enrolled-courses/update-enrolled-course-marks",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["enrolledCourses"],
    }),
  }),
});

export const { useGetAllEnrolledCoursesQuery, useAddMarksMutation } =
  facultyCourseManagementApi;
