import { z } from 'zod';

const createStudent = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'studentId is required',
    }),
    firstName: z.string({
      required_error: 'firstName is required',
    }),
    lastName: z.string({
      required_error: 'lasttName is required',
    }),
    middleName: z.string({
      required_error: 'middleName is required',
    }),
    profileImage: z.string({}).optional(),
    email: z.string({
      required_error: 'email is required',
    }),
    contactNo: z.string({
      required_error: 'contactNo is required',
    }),
    gender: z.string({
      required_error: 'gender is required',
    }),
    bloodGroup: z.string({
      required_error: 'bloodGroup is required',
    }),

    academicSemesterId: z.string({
      required_error: 'academicSemesterId is required',
    }),
    academicDepartmentId: z.string({
      required_error: 'academicDepartmentId is required',
    }),

    academicFacultyId: z.string({
      required_error: 'academicFaultyId is required',
    }),
  }),
});
const update = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'studentId is required',
    }).optional(),
    firstName: z.string({
      required_error: 'firstName is required',
    }).optional(),
    lastName: z.string({
      required_error: 'lasttName is required',
    }).optional(),
    middleName: z.string({
      required_error: 'middleName is required',
    }).optional(),
    profileImage: z.string({}).optional(),
    email: z.string({
      required_error: 'email is required',
    }).optional(),
    contactNo: z.string({
      required_error: 'contactNo is required',
    }).optional(),
    gender: z.string({
      required_error: 'gender is required',
    }).optional(),
    bloodGroup: z.string({
      required_error: 'bloodGroup is required',
    }).optional(),

    academicSemesterId: z.string({
      required_error: 'academicSemesterId is required',
    }).optional(),
    academicDepartmentId: z.string({
      required_error: 'academicDepartmentId is required',
    }).optional(),

    academicFacultyId: z.string({
      required_error: 'academicFaultyId is required',
    }).optional(),
  }),
});

export const StudentsValidation = {
    createStudent,update
};
