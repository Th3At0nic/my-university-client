import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Please select a name" }),
  year: z.string({ required_error: "Please select a year" }),
  startMonth: z.string({ required_error: "Please select start month" }),
  endMonth: z.string({ required_error: "Please select end month" }),
});

export const createAcademicFacultySchema = z.object({
  name: z
    .string({ required_error: "Name is required for Academic Faculty" })
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces"), // Rejects numbers
});
