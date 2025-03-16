/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import {
  useEnrollCourseMutation,
  useGetAllOfferedCourseForStudentQuery,
} from "../../redux/features/student/studentCourseManagement.api";
import { Button, Card, Col, Divider, Row, Space, Tag, Typography } from "antd";
import { NoDataCard } from "../../utils/NoDataCard";
import LoadingSpinner from "../../utils/LoadingSpinner";

type TOfferedCourseForStudent = {
  [index: string]: any;
};

type TSection = {
  section: string;
  _id: string;
  days: Array<string>;
  startTime: string;
  endTime: string;
};

const { Title, Text } = Typography;

const OfferedCourseForStudent = () => {
  const { data: offeredCoursesForStudent, isFetching } =
    useGetAllOfferedCourseForStudentQuery(undefined); //get my offered courses in the backend

  const [enrollCourse] = useEnrollCourseMutation();

  const offeredCourseObj = offeredCoursesForStudent?.data?.reduce(
    (acc: TOfferedCourseForStudent, item) => {
      const key = item.course.title;
      acc[key] = acc[key] || { courseTitle: key, sections: [] };

      acc[key].sections.push({
        section: item.section,
        _id: item._id,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
      });

      return acc;
    },
    {}
  );

  const modifiedData = Object.values(offeredCourseObj ? offeredCourseObj : {});

  const handleEnroll = async (id: string) => {
    const toastId = toast.loading("Processing enrollment...");
    try {
      const enrollData = {
        offeredCourse: id,
      };

      const res = await enrollCourse(enrollData).unwrap();

      console.log("res: ", res);

      if (res.data) {
        toast.success(res.message || "Enrolled Course Successfully", {
          duration: 2000,
          id: toastId,
        });
      } else if (res.error) {
        toast.error("Couldn't Enroll the course.", {
          duration: 2000,
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.", {
        duration: 2000,
        id: toastId,
      });
    }
  };

  if (isFetching) {
    return <LoadingSpinner />;
  }

  if (!modifiedData.length) {
    return (
      <NoDataCard
        title="No Offered Courses Available"
        description=" You may have already enrolled in all available courses, or no courses are currently offered."
      />
    );
  }

  return (
    <Row gutter={[12, 12]} justify="center">
      {modifiedData.map((item) => (
        <Col span={24} key={item.courseTitle}>
          <Card
            hoverable
            style={{
              padding: "12px",
              marginBottom: "8px",
              border: "1px solid #d9d9d9", // Manually added border
              borderRadius: "8px",
            }} // Reduced padding & margin
          >
            <Title level={3} style={{ marginBottom: 6 }}>
              {item.courseTitle}
            </Title>
            <Divider style={{ margin: "8px 0" }} />{" "}
            {item.sections.map((section: TSection, index: number) => (
              <Card
                key={index}
                style={{
                  marginBottom: 8,
                  padding: "8px", // Reduced padding inside section cards
                }}
              >
                <Row align="middle" justify="space-between">
                  <Col>
                    <Text strong style={{ fontSize: "16px" }}>
                      Section: {section.section}
                    </Text>
                  </Col>
                  <Col>
                    <Space>
                      {section.days.map((day: string) => (
                        <Tag
                          color="blue"
                          key={day}
                          style={{ fontSize: "14px" }}
                        >
                          {day}
                        </Tag>
                      ))}
                    </Space>
                  </Col>
                  <Col>
                    <Text style={{ fontSize: "16px" }}>
                      Start: {section.startTime}
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ fontSize: "16px" }}>
                      End: {section.endTime}
                    </Text>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => handleEnroll(section._id)}
                      type="primary"
                      style={{ padding: "10px 20px" }}
                    >
                      Enroll
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default OfferedCourseForStudent;
