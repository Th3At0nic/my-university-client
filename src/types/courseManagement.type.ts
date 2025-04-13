import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.type";
import { TFaculty, TStudent } from "./userManagement.type";

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

export type TOfferedCourseResponse = {
  success: true;
  message: string;
  data: {
    semesterRegistration: string;
    academicFaculty: string;
    academicDepartment: string;
    academicSemester: string;
    course: string;
    faculty: string;
    maxCapacity: number;
    section: number;
    days: string[]; // Example: ["Fri"]
    startTime: string; // Format: "HH:MM"
    endTime: string; // Format: "HH:MM"
    _id: string;
    createdAt: string; // ISO timestamp
    updatedAt: string; // ISO timestamp
    __v: number;
  };
};

export type ObjectId = string;

export type TOfferedCourse = {
  _id: ObjectId;
  semesterRegistration: ObjectId;
  academicFaculty: ObjectId;
  academicDepartment: ObjectId;
  academicSemester: ObjectId;
  course: ObjectId;
  faculty: ObjectId;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
  _id: ObjectId;
};

export type TEnrolledCourse = {
  _id: ObjectId;
  semesterRegistration: TSemester;
  academicSemester: TAcademicSemester;
  academicFaculty: TAcademicFaculty;
  academicDepartment: TAcademicDepartment;
  offeredCourse: TOfferedCourse;
  course: TCourse;
  student: TStudent;
  faculty: TFaculty;
  isEnrolled: boolean;
  courseMarks: TCourseMarks;
  grade: string;
  gradePoints: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
