import MySchedule from "../pages/student/MySchedule";
import OfferedCourseForStudent from "../pages/student/OfferedCourseForStudent";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Course",
    path: "offeredCourse",
    element: <OfferedCourseForStudent />,
  },
  {
    name: "My Schedule",
    path: "schedule",
    element: <MySchedule />,
  },
];
