import { useParams } from "react-router-dom";
import { useGetAllEnrolledCoursesQuery } from "../../redux/features/faculty/facultyCourseManagement.api";
import { Button, Table } from "antd";
import { NoDataCard } from "../../utils/NoDataCard";
import LoadingSpinner from "../../utils/LoadingSpinner";

const MyStudents = () => {
  const { registeredSemesterId, courseId } = useParams();

  const {
    data: facultyCoursesData,
    error,
    isFetching,
  } = useGetAllEnrolledCoursesQuery([
    { name: "semesterRegistration", value: registeredSemesterId },
    { name: "course", value: courseId },
  ]);

  const tableData = error
    ? []
    : facultyCoursesData?.data?.map(
        ({ _id, student, course, academicDepartment, academicSemester }) => ({
          key: _id,
          name: student.fullName,
          roll: student.id,
          courseTitle: course.title,
          semester: `${academicSemester.name} ${academicSemester.year}`,
          department: academicDepartment.name,
        })
      );

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      key: "roll",
      dataIndex: "roll",
    },
    {
      title: "Course",
      key: "courseTitle",
      dataIndex: "courseTitle",
    },
    {
      title: "Semester",
      key: "semester",
      dataIndex: "semester",
    },
    {
      title: "Department",
      key: "department",
      dataIndex: "department",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update Marks</Button>
          </div>
        );
      },
    },
  ];

  if (isFetching) {
    return <LoadingSpinner />;
  }

  if (!facultyCoursesData?.data?.length) {
    return (
      <NoDataCard
        title="No Students Enrolled"
        description="There are currently no students enrolled in this course for the semester."
      />
    );
  }

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default MyStudents;
