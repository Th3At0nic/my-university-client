import { TAcademicSemester } from "./academicManagement.type";
import { TFaculty } from "./userManagement.type";

export type TSemester = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: TPreRequisiteCourse[];
};

export type TPreRequisiteCourse = {
  course: TCourse;
  isDeleted: boolean;
  _id: string;
};

export type TCourseTableData = {
  key: string;
  title: string;
  code: number;
};

export type TCourseFacultyResponse = {
  _id: string;
  __v: number;
  course: TCourse;
  faculties: TFaculty[];
};
