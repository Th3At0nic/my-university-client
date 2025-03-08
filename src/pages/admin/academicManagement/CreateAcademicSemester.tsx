import { FieldValues } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/academicManagement.constant";
import { monthOptions } from "../../../constants/global.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { toast } from "sonner";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagementApi";
import { TResponse } from "../../../types/globalTypes";
import { TAcademicSemester } from "../../../types/academicManagement.type";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating Academic Semester...");
    const selectedSemesterData = {
      name: semesterOptions[Number(data?.name) - 1]?.label,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };

    try {
      const res = (await addAcademicSemester(
        selectedSemesterData
      )) as TResponse<TAcademicSemester>;

      if (res?.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
          id: toastId,
        });
      } else {
        toast.success("Academic Semester Created Successfully.", {
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
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name="name" options={semesterOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
