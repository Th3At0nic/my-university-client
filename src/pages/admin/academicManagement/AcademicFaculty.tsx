import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagementApi";
import { useAppDispatch } from "../../../redux/hooks";
import { setAcademicFaculties } from "../../../redux/features/admin/academicFacultySlice";
import { useEffect } from "react";
import { TAcademicFaculty } from "../../../types";

type TTableData = Pick<TAcademicFaculty, "_id" | "name">;

const AcademicFaculty = () => {
  const dispatch = useAppDispatch();

  const {
    data: academicFaculties,
    error,
    isFetching,
  } = useGetAllAcademicFacultiesQuery(undefined);

  useEffect(() => {
    if (academicFaculties) {
      dispatch(setAcademicFaculties(academicFaculties.data)); //  Runs after first render
    }
  }, [dispatch, academicFaculties]);

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
      loading={{ spinning: isFetching, size: "large" }}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicFaculty;
