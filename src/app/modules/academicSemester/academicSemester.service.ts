import { AcademicSemester, Prisma } from '@prisma/client';

import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicSemesterSearchableField } from './academicSemester.constant';
import { IAcademicSemesterRequest } from './academicSemester.interface';

const insertIntoDb = async (
  academicSemesterData: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data: academicSemesterData,
  });

  return result;
};

const getAllFromDb = async (
  filters: IAcademicSemesterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[] | null>> => {
  const { searchTerm, ...otherData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const andCondition = [];
  console.log(otherData);
  if (searchTerm) {
    andCondition.push({
      OR: AcademicSemesterSearchableField.map(field => ({
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

  const whereCondition: Prisma.AcademicSemesterWhereInput = andCondition.length
    ? { AND: andCondition }
    : {};
  const result = await prisma.academicSemester.findMany({
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

const getDataById = async (id: string): Promise<AcademicSemester |null> => {
  const result = await prisma.academicSemester.findUnique({
    where: { id: id },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<AcademicSemester>
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.update({
      where: {
          id
      },
      data: payload
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.delete({
      where: {
          id
      }
  });
  return result;
};

export const AcademicSemesterService = {
  insertIntoDb,
  getAllFromDb,
  getDataById,
  updateOneInDB,
  deleteByIdFromDB
};
