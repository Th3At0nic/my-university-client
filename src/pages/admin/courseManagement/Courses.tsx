import { Button, Table, TableColumnsType } from "antd";
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery,
  useGetAllFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TCourse, TCourseTableData } from "../../../types";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TTableData = Pick<TCourse, "title" | "code">;

const Courses = () => {
  const { data: courses, error, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = error
    ? []
    : courses?.data?.map(({ _id, title, code }) => ({
        key: _id,
        title,
        code,
      }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Course Title",
      dataIndex: "title", // Ensure this matches `TTableData`
      key: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AssignFacultyModal data={item} />;
      },
    },
  ];

  return (
    <Table
      loading={{ spinning: isFetching, size: "large" }}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

const AssignFacultyModal = ({ data }: { data: TCourseTableData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [assignFaculties] = useAssignFacultiesMutation();

  const { data: faculties } = useGetAllFacultiesQuery(undefined);

  const facultiesOptions = faculties?.data?.map((item) => ({
    label: item.fullName,
    value: item._id,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (formData: FieldValues) => {
    const toastId = toast.loading("Assigning faculties.");
    const infos = {
      courseId: data.key,
      data: formData,
    };
    try {
      assignFaculties(infos);
      toast.success("Assigned Faculties Successfully.", {
        duration: 3000,
        id: toastId,
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.", {
        duration: 3000,
        id: toastId,
      });
    }
  };

  return (
    <>
      <Button onClick={showModal}>Assign Faculties</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            label="Faculty"
            name="faculties"
            options={facultiesOptions}
            mode="multiple"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
