import { Row, Col, Divider, Button } from "antd";
import { SubmitHandler, FieldValues } from "react-hook-form";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHImageInput from "../../../components/form/PHImageInput";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useGetAStudentQuery,
  useUpdateStudentMutation,
} from "../../../redux/features/admin/userManagementApi";
import { bloodGroupOptions, genderOptions } from "../../../constants";
import { useParams } from "react-router-dom";
import {
  useGetAllAcademicSemesterQuery,
  useGetAllAcademicDepartmentsQuery,
} from "../../../redux/features/admin/academicManagementApi";
import dayjs from "dayjs";
import LoadingSpinner from "../../../utils/LoadingSpinner";

const StudentUpdate = () => {
  const { studentId } = useParams();

  const { data: semesterData, isLoading: semesterIsLoading } =
    useGetAllAcademicSemesterQuery(undefined);

  const { data: departmentData, isLoading: departmentIsLoading } =
    useGetAllAcademicDepartmentsQuery(undefined);

  const { data: studentData } = useGetAStudentQuery(studentId, {
    skip: !studentId, // Skip the query if studentId is not available
  });

  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const semesterOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const modifiedStudentData = studentData
    ? {
        ...studentData.data, // Create a shallow copy of the student object
        dateOfBirth: dayjs(studentData?.data?.dateOfBirth), // Convert to Day.js object
      }
    : null;

  const [updateStudent] = useUpdateStudentMutation();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const updateData = {
      student: data,
    };
    // console.log(updateData);
    // const formData = new FormData();
    // formData.append("student", JSON.stringify(data));
    // formData.append("file", data.profileImg);

    updateStudent({ id: studentId, data: updateData });

    // this is just for development testing purpose
    // console.log(Object.fromEntries(formData));
  };

  // spin until the student data is not ready
  if (!studentData) {
    return <LoadingSpinner />;
  }
  return (
    <Row>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          defaultValues={modifiedStudentData || studentData?.data}
        >
          <Divider>Personal Info</Divider>
          <Row gutter={10}>
            <Col span={24} lg={8} md={12}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHSelect name="gender" label="Gender" options={genderOptions} />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHDatePicker name="dateOfBirth" label="Date of birth" />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHSelect
                name="bloodGroup"
                label="Blood Group"
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHImageInput name="profileImg" label="Upload Profile Picture" />
            </Col>
          </Row>
          <Divider>Contact Info</Divider>
          <Row gutter={10}>
            <Col span={24} lg={8} md={12}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput type="text" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address "
              />
            </Col>
          </Row>
          <Divider>Guardian</Divider>
          <Row gutter={10}>
            <Col span={24} lg={8} md={12}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput
                type="number"
                name="guardian.fatherContact"
                label="Father Contact No"
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation "
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput
                type="number"
                name="guardian.motherContact"
                label="Mother Contact No"
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={10}>
            <Col span={24} lg={8} md={12}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput
                type="number"
                name="localGuardian.contactNo"
                label="Contact No"
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>
          <Divider>Academic Info</Divider>
          <Row gutter={10}>
            <Col span={24} lg={8} md={12}>
              <PHSelect
                label="Academic Department"
                name="academicDepartment"
                options={departmentOptions}
                defaultValue={departmentOptions?.find(
                  (item) =>
                    item.value === studentData?.data?.academicDepartment._id
                )}
                disabled={departmentIsLoading}
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHSelect
                label="Admission Semester"
                name="admissionSemester"
                options={semesterOptions}
                defaultValue={semesterOptions?.find(
                  (item) =>
                    item.value === studentData?.data?.admissionSemester._id
                )}
                disabled={semesterIsLoading}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default StudentUpdate;
