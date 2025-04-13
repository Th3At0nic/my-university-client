import * as z from "zod";

export const offerCourseFormSchema = z
  .object({
    semesterRegistration: z
      .string({ required_error: "Semester Registration is required" })
      .min(1),
    academicFaculty: z
      .string({ required_error: "Academic Faculty is required" })
      .min(1),
    academicDepartment: z
      .string({ required_error: "Academic Department is required" })
      .min(1),
    course: z.string({ required_error: "Course is required" }).min(1),
    faculty: z.string({ required_error: "Faculty is required" }).min(1),
    maxCapacity: z
      .string({ required_error: "Max Capacity is required" })
      .min(1, "Capacity must be at least 1")
      .max(500, "Capacity cannot exceed 500"),
    section: z
      .string({ required_error: "Section is required" })
      .min(1, "Section must be at least 1")
      .max(99, "Section cannot exceed 99"),
    days: z
      .array(z.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]))
      .min(1, "At least one day is required"),
    startTime: z
      .string({ required_error: "Start Time is required" })
      .regex(
        /^([0-1]\d|2[0-3]):([0-5]\d)$/,
        "Start time must be in HH:mm format"
      ),
    endTime: z
      .string({ required_error: "End Time is required" })
      .regex(
        /^([0-1]\d|2[0-3]):([0-5]\d)$/,
        "End time must be in HH:mm format"
      ),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "Start time must be before end time",
    path: ["startTime"],
  });

export const semesterRegistrationSchema = z
  .object({
    academicSemester: z
      .string({ required_error: "Academic Semester is required" })
      .min(1),
    status: z.enum(["UPCOMING", "ONGOING", "COMPLETED"], {
      errorMap: () => ({ message: "Invalid status value" }),
    }),
    startDate: z
      .string({ required_error: "Start Date is required" })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid start date",
      }),
    endDate: z
      .string({ required_error: "End Date is required" })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid end date",
      }),
    minCredit: z
      .string({ required_error: "Minimum Credit is required" })
      .min(1, "Minimum credit must be at least 1")
      .max(100, "Minimum credit is too high"),
    maxCredit: z
      .string({ required_error: "Maximum Credit is required" })
      .min(1, "Maximum credit must be at least 1")
      .max(100, "Maximum credit is too high"),
  })
  .refine((data) => new Date(data.startDate) < new Date(data.endDate), {
    message: "Start date must be before end date",
    path: ["startDate"],
  })
  .refine((data) => data.minCredit < data.maxCredit, {
    message: "Minimum credit must be less than maximum credit",
    path: ["minCredit"],
  });
