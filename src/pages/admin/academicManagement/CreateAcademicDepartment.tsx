import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Col, Button } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { createAcademicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { FieldValues } from "react-hook-form";
import { TDepartmentResponse } from "../../../types/academicManagement.type";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { useEffect, useState } from "react";

const CreateAcademicDepartment = () => {
  const [academicFacultyOptions, setAcademicFacultyOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const { data: academicFaculties, error } =
    useGetAllAcademicFacultiesQuery(undefined);

  useEffect(() => {
    if (academicFaculties && !error) {
      const AFacultyOptions = academicFaculties?.data?.map((item) => ({
        value: String(item._id),
        label: item.name,
      }));
      setAcademicFacultyOptions(AFacultyOptions!);
    }
  }, [academicFaculties, error]);

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
