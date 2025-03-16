import { Flex, Col, Button } from "antd";
import PHForm from "../../components/form/PHForm";
import PHSelect from "../../components/form/PHSelect";
import { useGetAllEnrolledCoursesQuery } from "../../redux/features/faculty/facultyCourseManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();
  const { data: allEnrolledCourses } = useGetAllEnrolledCoursesQuery(undefined);
  console.log(allEnrolledCourses);

  const semesterOptions = allEnrolledCourses?.data?.map((item) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));

  const courseOptions = allEnrolledCourses?.data?.map((item) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("formData: ", data);
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Semester Registration"
            name="semesterRegistration"
            options={semesterOptions}
          />
          <PHSelect label="Course" name="course" options={courseOptions} />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
