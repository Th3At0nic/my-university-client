import { TEnrolledCourse } from "./courseManagement.type";

export type CourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
  _id: string;
};

export type TStudentTableDataOfAddMarksModal = {
  key: string;
  name: string;
  roll: string;
  studentId: string;
  courseTitle: string;
  semester: string;
  department: string;
  semesterRegistrationId: string;
  offeredCourseId: string;
  courseMarks: CourseMarks;
};

export type TAddMarksResponse = {
  success: boolean;
  message: string;
  data: TEnrolledCourse;
};
