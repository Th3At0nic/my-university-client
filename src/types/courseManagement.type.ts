import { TAcademicSemester } from "./academicManagement.type";

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

export type TFacultyName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TFaculty = {
  _id: string;
  id: string;
  user: string; // Change Types.ObjectId to string
  designation: string;
  name: TFacultyName;
  gender: "male" | "female" | "others";
  dateOfBirth?: string; // Change Date to string
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  fullName: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  academicFaculty: string; // Change Types.ObjectId to string
  academicDepartment: string; // Change Types.ObjectId to string
  isDeleted: boolean;
};

export type TCourseTableData = {
  key: string;
  title: string;
  code: number;
};
