import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Academic `Title` is required',
    }),
  }),
});
const update = z.object({
  body: z.object({
      title: z.string({
          required_error: 'Title is required'
      })
  })
});

export const AcademicFacultyValidation = {
  create,update
};

/* 
id                  String               @id @default(uuid())
title               String
createdAt           DateTime             @default(now())
updatedAt           DateTime             @updatedAt
academicDepartments AcademicDepartment[]
students            Students[]
faculties           Faculty[]
*/
