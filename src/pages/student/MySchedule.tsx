import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";
import { Card, List, Typography, Tag, Row, Col, Avatar } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  BookOutlined,
  FieldTimeOutlined,
  TeamOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const MySchedule = () => {
  const { data: enrolledCourseData } = useGetAllEnrolledCoursesQuery(undefined);
  console.log(enrolledCourseData);

  return (
    <Row gutter={[16, 16]}>
      {enrolledCourseData?.data?.map((item) => (
        <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <BookOutlined />
                <span>{item.course.title}</span>
              </div>
            }
            style={{
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
            }}
          >
            <List>
              <List.Item
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span>
                  <TeamOutlined style={{ color: "#1890ff" }} />{" "}
                  <Text strong>Faculty:</Text>
                </span>
                {item.academicFaculty.name}
              </List.Item>

              <List.Item
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span>
                  <TeamOutlined style={{ color: "#faad14" }} />{" "}
                  <Text strong>Department:</Text>
                </span>
                {item.academicDepartment.name}
              </List.Item>

              <List.Item
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span>
                  <FieldTimeOutlined style={{ color: "#52c41a" }} />{" "}
                  <Text strong>Semester:</Text>
                </span>
                <Tag color="blue">
                  {item.academicSemester.name} {item.academicSemester.year}
                </Tag>
              </List.Item>

              <List.Item
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>
                  <UserOutlined style={{ color: "#722ed1" }} />{" "}
                  <Text strong>Instructor:</Text>
                </span>

                {/* Avatar & Name together to avoid unnecessary space */}
                <span
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <Avatar icon={<UserOutlined />} size="small" />
                  {item.faculty.fullName}
                </span>
              </List.Item>

              <List.Item
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  flexWrap: "wrap",
                }}
              >
                <span>
                  <ClockCircleOutlined style={{ color: "#eb2f96" }} />{" "}
                  <Text strong>Schedule:</Text>
                </span>

                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                  {item.offeredCourse.days.map((day) => (
                    <Tag color="green" key={day}>
                      {day}
                    </Tag>
                  ))}
                </div>

                <Tag icon={<ClockCircleOutlined />}>
                  {item.offeredCourse.startTime} - {item.offeredCourse.endTime}
                </Tag>
              </List.Item>

              <List.Item
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span>
                  <Text strong>Credits:</Text>
                </span>{" "}
                {item.course.credits}
              </List.Item>

              {/* conditional item, if isEnroleld true show first on, or show last one */}
              {item.isEnrolled ? (
                <List.Item
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <Text strong style={{ color: "green" }}>
                    Enrolled
                  </Text>
                  <CheckOutlined style={{ color: "green", fontSize: "20px" }} />
                </List.Item>
              ) : (
                <List.Item
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <Text strong style={{ color: "red" }}>
                    Not Enrolled
                  </Text>
                  <CloseOutlined style={{ color: "Red", fontSize: "20px" }} />
                </List.Item>
              )}
            </List>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MySchedule;
