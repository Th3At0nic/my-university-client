import { TQueryParam, TResponseRedux, TSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/semester-registrations/",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Semester"],
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),

    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Semester"],
    }),
    updateRegisteredSemester: builder.mutation({
      query: (args) => {
        return {
          url: `/semester-registrations/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["Semester"],
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} = courseManagementApi;
