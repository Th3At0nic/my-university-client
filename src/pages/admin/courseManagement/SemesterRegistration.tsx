/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Col, Button } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagementApi";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { semesterRegistrationSchema } from "../../../schemas/courseManagement.schema";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetAllAcademicSemesterQuery([
    { name: "sortBy", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit = async (data: FieldValues) => {
    console.log("data; ", data);
    const toastId = toast.loading("Creating Semester Registration");

    const selectedSemesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      const res = (await addSemester(selectedSemesterData)) as TResponse<any>;

      if (res?.error) {
        console.log("res err;", res.error);
        toast.error(res.error.data.message, {
          duration: 3000,
          id: toastId,
        });
      } else {
        toast.success("Semester Registered Successfully.", {
          duration: 3000,
          id: toastId,
        });
      }
    } catch (err) {
      console.log("ekhaen err", err);
      toast.error("Something went wrong", { duration: 3000, id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          // resolver={zodResolver(semesterRegistrationSchema)}
        >
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <PHSelect
            label="Status"
            name="status"
            options={semesterStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput type="number" name="minCredit" label="Min Credit" />
          <PHInput type="number" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
