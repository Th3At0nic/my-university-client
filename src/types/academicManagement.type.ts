export type TAcademicSemester = {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TFacultyResponse = {
  success: boolean;
  message: string;
  data: TAcademicFaculty;
};

// export type TAcademicFacultyInitialState = {
//   _id: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
// };

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TDepartmentResponse = {
  success: boolean;
  message: string;
  data: TAcademicDepartment;
};
