import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import { createAcademicFacultySchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types/globalTypes";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Creating Academic Faculty...");

    try {
      const res = (await addAcademicFaculty(
        data
      )) as TResponse<TAcademicFaculty>;
      console.log("ekhane res: ", res);

      if (res?.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
          id: toastId,
        });
      } else {
        toast.success("Academic Faculty Created Successfully.", {
          duration: 2000,
          id: toastId,
        });
      }
    } catch (err) {
      console.log("ekhaen err", err);
      toast.error("Something went wrong", { duration: 2000, id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createAcademicFacultySchema)}
        >
          <PHInput type="text" name="name" label="Name" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
