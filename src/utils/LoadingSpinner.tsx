import { Spin } from "antd";

const LoadingSpinner = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Spin size="large" />
    </div>
  );
};

export default LoadingSpinner;
