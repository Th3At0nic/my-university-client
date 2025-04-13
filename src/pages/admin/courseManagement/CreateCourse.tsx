import { Flex, Col, Button } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TCourse, TPreRequisiteCourse, TResponse } from "../../../types";

const CreateCourse = () => {
  const [addCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCourseOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating Semester Registration");

    const selectedCourseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses.map((item: TPreRequisiteCourse) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const res = (await addCourse(selectedCourseData)) as TResponse<TCourse>;

      if (res?.error) {
        console.log("res err;", res.error);
        toast.error(res.error.data.message, {
          duration: 3000,
          id: toastId,
        });
      } else {
        toast.success("Course Created Successfully.", {
          duration: 3000,
          id: toastId,
        });
      }
    } catch (err) {
      console.log("err from createCourse:", err);
      toast.error("Something went wrong", { duration: 3000, id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="title" label="Title" />
          <PHInput type="text" name="prefix" label="Prefix" />
          <PHInput type="number" name="code" label="Code" />
          <PHInput type="number" name="credits" label="Credits" />
          <PHSelect
            label="Pre Requisite Courses"
            name="preRequisiteCourses"
            options={preRequisiteCourseOptions}
            mode="multiple"
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
