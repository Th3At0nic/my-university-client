import { useGetAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const data = useGetAcademicSemesterQuery(undefined);

  console.log("ehane getAcademicSemQuery data: ", data);
  return (
    <div>
      <h2>This is academic semester component</h2>
    </div>
  );
};

export default AcademicSemester;
