import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.type";

export type TStudent = {
  _id: string;
  id: string;
  user: TUser;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  academicDepartment: TAcademicDepartment;
  admissionSemester: TAcademicSemester;
  academicFaculty: TAcademicFaculty;
  isDeleted: boolean;
  profileImg: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
};

export type TUser = {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
  _id: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
};

// export type TAcademicDepartment = {
//   _id: string;
//   name: string;
//   academicFaculty: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// };

// export type TAdmissionSemester = {
//   _id: string;
//   name: string;
//   code: string;
//   year: string;
//   startMonth: string;
//   endMonth: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// };

// export type TAcademicFaculty = {
//   _id: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }
