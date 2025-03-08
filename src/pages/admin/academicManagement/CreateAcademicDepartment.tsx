import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Col, Button } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { createAcademicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { FieldValues } from "react-hook-form";
import { useAppSelector } from "../../../redux/hooks";
import { useAcademicFaculties } from "../../../redux/features/admin/academicFacultySlice";
import {
  TAcademicFacultyInitialState,
  TDepartmentResponse,
} from "../../../types/academicManagement.type";
import PHSelect from "../../../components/form/PHSelect";
import { useAddAcademicDepartmentMutation } from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types/globalTypes";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const academicFaculties = useAppSelector(
    useAcademicFaculties
  ) as TAcademicFacultyInitialState[];

  const academicFacultyOptions = academicFaculties.map((item) => ({
    value: String(item._id),
    label: item.name,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating Academic Department...");
    try {
      const res = (await addAcademicDepartment(
        data
      )) as TResponse<TDepartmentResponse>;

      if (res?.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
          id: toastId,
        });
      } else {
        toast.success(res.data?.message, {
          duration: 2000,
          id: toastId,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.", { duration: 2000, id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createAcademicDepartmentSchema)}
        >
          <PHInput type="text" name="name" label="Name" />
          <PHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
