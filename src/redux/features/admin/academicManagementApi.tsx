import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
  TQueryParam,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["academicSemester"],
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicSemester"],
    }),
    getAllAcademicFaculties: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
      providesTags: ["academicFaculty"],
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicFaculty"],
    }),

    getAllAcademicDepartments: builder.query({
      query: () => ({
        url: "/academic-departments",
        method: "GET",
      }),
      providesTags: ["academicDepartment"],
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),

    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicDepartment"],
    }),
  }),
});

export const {
  useGetAllAcademicSemesterQuery,
  useAddAcademicSemesterMutation,
  useAddAcademicFacultyMutation,
  useGetAllAcademicFacultiesQuery,
  useAddAcademicDepartmentMutation,
  useGetAllAcademicDepartmentsQuery,
} = academicManagementApi;
