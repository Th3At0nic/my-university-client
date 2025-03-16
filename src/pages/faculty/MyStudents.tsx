import { useParams } from "react-router-dom";
import {
  useAddMarksMutation,
  useGetAllEnrolledCoursesQuery,
} from "../../redux/features/faculty/facultyCourseManagement.api";
import { Button, Modal, Table } from "antd";
import { NoDataCard } from "../../utils/NoDataCard";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import {
  TAddMarksResponse,
  TStudentTableDataOfAddMarksModal,
} from "../../types/facultyCourseManagement.type";
import { TResponse } from "../../types";

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
        ({
          _id,
          student,
          course,
          academicDepartment,
          academicSemester,
          offeredCourse,
          semesterRegistration,
          courseMarks,
        }) => ({
          key: _id,
          name: student.fullName,
          roll: student.id,
          studentId: student._id,
          courseTitle: course.title,
          semester: `${academicSemester.name} ${academicSemester.year}`,
          department: academicDepartment.name,
          semesterRegistrationId: semesterRegistration._id,
          offeredCourseId: offeredCourse._id,
          courseMarks,
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
      render: (item: TStudentTableDataOfAddMarksModal) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
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

/*********** Add Marks Modal *************/

const AddMarksModal = ({
  studentInfo,
}: {
  studentInfo: TStudentTableDataOfAddMarksModal;
}) => {
  const [addMarks] = useAddMarksMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (formData: FieldValues) => {
    const toastId = toast.loading("Assigning faculties.");

    const addMarksInfos = {
      semesterRegistration: studentInfo.semesterRegistrationId,
      offeredCourse: studentInfo.offeredCourseId,
      student: studentInfo.studentId,
      courseMarks: {
        classTest1: Number(formData.classTest1),
        midTerm: Number(formData.midTerm),
        classTest2: Number(formData.classTest2),
        finalTerm: Number(formData.finalTerm),
      },
    };

    try {
      const res = (await addMarks(
        addMarksInfos
      )) as TResponse<TAddMarksResponse>;

      if (res?.data?.success) {
        toast.success(res.data.message || "Added Marks Successfully", {
          duration: 3000,
          id: toastId,
        });
      } else if (res.error) {
        toast.error(`${res.error.data.message}, Sorry.`, {
          duration: 3000,
          id: toastId,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.", {
        duration: 3000,
        id: toastId,
      });
    }
  };

  return (
    <>
      <Button onClick={showModal}>Add Marks</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHInput name="classTest1" label="Class Test-1" type="number" />
          <PHInput name="midTerm" label="Mid Term" type="number" />
          <PHInput name="classTest2" label="Class Test-2" type="number" />
          <PHInput name="finalTerm" label="Final Term" type="number" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default MyStudents;
