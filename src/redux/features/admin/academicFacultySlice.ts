// import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../../store";
// import { TAcademicFacultyInitialState } from "../../../types";

// const initialState = {
//   academicFaculties: [] as TAcademicFacultyInitialState[],
// };

/*

i commented theses code because same thing is done by RTK Query caching and tagging,
i didn't know it before, so that i implemented this , which is more login ad not necessary while i have
caching and tagging options , which is easy and light

*/

// const academicFacultySlice = createSlice({
//   name: "academicFaculty",
//   initialState,
//   reducers: {
//     setAcademicFaculties: (state, action) => {
//       if (Array.isArray(action.payload)) {
//         state.academicFaculties = action.payload; // If payload is an array, replace the whole state.
//       } else {
//         const existingIndex = state.academicFaculties.findIndex(
//           (item) => item._id === action.payload._id
//         );

//         if (existingIndex !== -1) {
//           //  If department already exists, update it
//           state.academicFaculties[existingIndex] = action.payload;
//         } else {
//           // Otherwise, add it as a new department
//           state.academicFaculties.push(action.payload);
//         }
//       }
//     },
//   },
// });

// export const { setAcademicFaculties } = academicFacultySlice.actions;

// export default academicFacultySlice.reducer;

// export const useAcademicFaculties = (state: RootState) =>
//   state.academicFaculty.academicFaculties;
