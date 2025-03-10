import { Col, Button, Row, Divider } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import {
  bloodGroupOptions,
  genderOptions,
} from "../../../constants/global.constant";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicSemesterQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagementApi";
import PHImageInput from "../../../components/form/PHImageInput";

//this is for testing purpose, this should be removed
const studentDefaultValue = {
  name: {
    firstName: "Rahat",
    middleName: "Mohammad",
    lastName: "Shuvo",
  },
  gender: "male",
  bloodGroup: "A+",

  email: "john3a@example.com",
  contactNo: "145512589121",
  emergencyContactNo: "098145542321",
  presentAddress: "123 Elm Street, Springfield",
  permanentAddress: "456 Oak Street, Springfield",

  guardian: {
    fatherName: "Robert Doe",
    fatherOccupation: "Engineer",
    fatherContact: "1111111111",
    motherName: "Jane Doe",
    motherOccupation: "Teacher",
    motherContact: "2222222222",
  },
  localGuardian: {
    name: "Emily Stone",
    occupation: "Lawyer",
    contactNo: "3333333",
    address: "789 Maple Street, Springfield",
  },

  academicDepartment: "679e22c49a1ffbfc1cefe288",
  admissionSemester: "679e250273741ba15e366753",
};

const CreateStudent = () => {
  const { data: semesterData, isLoading: semesterIsLoading } =
    useGetAllAcademicSemesterQuery(undefined);

  const { data: departmentData, isLoading: departmentIsLoading } =
    useGetAllAcademicDepartmentsQuery(undefined);

  const [addStudent] = useAddStudentMutation();

  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const semesterOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const stuData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(stuData));
    formData.append("file", data.profileImg);

    addStudent(formData);

    //this is just for development testing purpose
    // console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValue}>
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
                disabled={departmentIsLoading}
              />
            </Col>
            <Col span={24} lg={8} md={12}>
              <PHSelect
                label="Admission Semester"
                name="admissionSemester"
                options={semesterOptions}
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

export default CreateStudent;
