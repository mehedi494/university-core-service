import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicDepartmentSearchableField } from './academicDepartment.constant';
import { IAcademicDepartmentRequest } from './academicDepartment.interface';

const insertIntoDb = async (
  academicDepartmentData: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data: academicDepartmentData,
  });

  return result;
};

const getAllFromDb = async (
  filters: IAcademicDepartmentRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[] | null>> => {
  const { searchTerm, ...otherData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const andCondition = [];
  console.log(otherData);
  if (searchTerm) {
    andCondition.push({
      OR: AcademicDepartmentSearchableField.map(field => ({
        [field]: { contains: searchTerm, mode: 'insensitive' },
      })),
    });
  }

  if (Object.keys(otherData).length > 0) {
    andCondition.push({
      AND: Object.keys(otherData).map(key => ({
        [key]: {
          equals: (otherData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.AcademicDepartmentWhereInput =
    andCondition.length ? { AND: andCondition } : {};
  const result = await prisma.academicDepartment.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.academicSemester.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: { id: id },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<AcademicDepartment>
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.update({
      where: {
          id
      },
      data: payload,
      include: {
          academicFaculty: true
      }
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.delete({
      where: {
          id
      },
      include: {
          academicFaculty:true
      }
  });
  return result;
};


export const AcademicDepartmentService = {
  insertIntoDb,
  getAllFromDb,
  getDataById,
  updateOneInDB,
  deleteByIdFromDB
};
