import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagementApi";
import { TQueryParam, TStudent } from "../../../types";
import { useState } from "react";

type TTableData = Pick<TStudent, "fullName" | "id">;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(3);

  const {
    data: studentData,
    error,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "limit", value: "3" },
    { name: "page", value: page },
    { name: "sortBy", value: "id" },
    ...params,
  ]);

  const metaData = studentData?.meta;

  const tableData = error
    ? []
    : studentData?.data?.map(({ _id, fullName, id }) => ({
        key: _id,
        fullName,
        id,
      }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
    },

    {
      title: "Roll No.",
      dataIndex: "id",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Space>
            <Button>Update</Button>
            <Button>Details</Button>
            <Button>Change Status</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={{ spinning: isFetching, size: "large" }}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentData;
