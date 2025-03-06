import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagementApi";

const AcademicSemester = () => {
  const { data } = useGetAllAcademicSemesterQuery(undefined);

  console.log("ehane getAcademicSemQuery data: ", data);
  return (
    <div>
      <h2>This is academic semester component</h2>
    </div>
  );
};

export default AcademicSemester;
