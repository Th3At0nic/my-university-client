/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Col, Button } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues } from "react-hook-form";
import {
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import PHInput from "../../../components/form/PHInput";
import { useState } from "react";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import PHSelect from "../../../components/form/PHSelect";
import { offerCourseFormSchema } from "../../../schemas/courseManagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { daysOptionsArray } from "../../../constants";
import { toast } from "sonner";
import { TOfferedCourseRes, TResponse } from "../../../types";

const OfferCourse = () => {
  const [AFacultyId, setAFacultyId] = useState("");
  const [courseId, setCourseId] = useState("");

  /*********************** one  block ********************* */
  const { data: registeredSemesters } =
    useGetAllRegisteredSemestersQuery(undefined);

  const semesterRegistrationOptions = registeredSemesters?.data?.map(
    (item) => ({
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
      value: item._id,
    })
  );

  /*********************** one  block ********************* */

  const { data: academicFaculties } =
    useGetAllAcademicFacultiesQuery(undefined);

  const academicFacultyOptions = academicFaculties?.data?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  /*********************** one  block ********************* */

  const { data: academicDepartments } =
    useGetAllAcademicDepartmentsQuery(undefined);

  // Filter departments based on selected academic faculty ID
  const filteredAcademicDepartments = academicDepartments?.data?.filter(
    (department) => department.academicFaculty._id === AFacultyId
  );

  // Map filtered departments to options format
  const academicDepartmentOptions = filteredAcademicDepartments?.map(
    (item) => ({
      label: item.name,
      value: item._id,
    })
  );

  /*********************** one  block ********************* */

  const { data: courses } = useGetAllCoursesQuery(undefined);

  const courseOptions = courses?.data?.map((item) => ({
    label: item.title,
    value: item._id,
  }));

  /*********************** one  block ********************* */

  const { data: courseFaculties, isFetching: isCourseFacultyFetching } =
    useGetCourseFacultiesQuery(courseId, {
      skip: !courseId,
    });

  const courseFacultyOptions = courseFaculties?.data?.faculties.map((item) => ({
    label: item.fullName,
    value: item._id,
  }));

  /*********************** one  block ********************* */

  const daysOptions = daysOptionsArray.map((item) => item);

  /*********************** one  block ********************* */

  const [addOfferedCourse] = useAddOfferedCourseMutation();

  /*********************** one  block ********************** */

  const onSubmit = async (formData: FieldValues) => {
    const toastId = toast.loading("Offering new Course");
    try {
      const offerCourseData = {
        ...formData,
        maxCapacity: Number(formData.maxCapacity),
        section: Number(formData.section),
      };
      const res = (await addOfferedCourse(
        offerCourseData
      )) as TResponse<TOfferedCourseRes>;
      console.log(res);
      if (res.data) {
        toast.success(res.data.message || "Successfully Offered the Course", {
          duration: 2000,
          id: toastId,
        });
      } else {
        toast.error(res?.error?.data.message, {
          duration: 2000,
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!", {
        duration: 2000,
        id: toastId,
      });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(offerCourseFormSchema)}
        >
          <PHSelect
            label="Academic Semester"
            name="semesterRegistration"
            options={semesterRegistrationOptions}
          />
          <PHSelectWithWatch
            functionProp={setAFacultyId} //sending state function (setId) as props to set the value from another component
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />

          <PHSelect
            label="Academic Department"
            name="academicDepartment"
            disabled={!AFacultyId}
            options={academicDepartmentOptions}
          />

          <PHSelectWithWatch
            functionProp={setCourseId} //sending state function (setId) as props to set the value from another component
            label="Course"
            name="course"
            options={courseOptions}
          />

          <PHSelect
            label="Faculty"
            name="faculty"
            disabled={!courseId || isCourseFacultyFetching}
            options={courseFacultyOptions}
          />

          <PHInput type="number" name="maxCapacity" label="Max Capacity" />

          <PHInput type="number" name="section" label="Section" />

          <PHSelect
            label="Days"
            name="days"
            mode="multiple"
            options={daysOptions}
          />

          <PHTimePicker name="startTime" label="Start Time" />

          <PHTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
