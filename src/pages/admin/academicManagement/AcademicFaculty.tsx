import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagementApi";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

type TTableData = Pick<TAcademicFaculty, "_id" | "name">;

const AcademicFaculty = () => {
  const { data: academicFaculties, error } =
    useGetAllAcademicFacultiesQuery(undefined);

  const tableData = error
    ? []
    : academicFaculties?.data?.map(({ _id, name }) => ({
        key: _id,
        _id,
        name,
      }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table<TTableData>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicFaculty;
