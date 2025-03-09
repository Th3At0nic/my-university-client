import { TableColumnsType, Button, TableProps, Table } from "antd";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagementApi";

type TTableData = {
  // _id: string;
  name: string;
  // academicFacultyId: string; // ID from the nested academicFaculty
  academicFacultyName: string; // Name from the nested academicFaculty
};

const AcademicDepartment = () => {
  const {
    data: academicDepartments,
    error,
    isFetching,
  } = useGetAllAcademicDepartmentsQuery(undefined);

  const tableData = error
    ? []
    : academicDepartments?.data?.map(({ _id, name, academicFaculty }) => ({
        key: _id,
        name: name,
        academicFacultyName: academicFaculty.name,
      }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFacultyName",
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
      loading={{ spinning: isFetching, size: "large" }}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicDepartment;
