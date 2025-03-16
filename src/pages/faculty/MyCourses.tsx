import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const MyCourses = () => {
  const { data } = useGetAllEnrolledCoursesQuery(undefined);

  console.log(data);
  return (
    <div>
      <h1>Thi sis my courses</h1>
    </div>
  );
};

export default MyCourses;
