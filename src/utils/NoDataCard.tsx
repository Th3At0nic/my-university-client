import { Card, Empty } from "antd";

// Define types for the props
type NoDataCardProps = {
  title: string;
  description: string;
};

export const NoDataCard = ({ title, description }: NoDataCardProps) => {
  return (
    <Card style={{ textAlign: "center", marginTop: "50px" }}>
      <Empty description={title} />
      <p style={{ color: "#777" }}>{description}</p>
    </Card>
  );
};
