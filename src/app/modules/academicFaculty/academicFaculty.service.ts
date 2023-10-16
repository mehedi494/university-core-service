import { AcademicFaculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicFacultySearchableField } from './academicFaculty.constant';
import { IAcademicFacultyRequest } from './academicFaculty.interface';

const insertIntoDb = async (
  academicFacultyData: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data: academicFacultyData,
  });

  return result;
};

const getAllFromDb = async (
  filters: IAcademicFacultyRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[] | null>> => {
  const { searchTerm, ...otherData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const andCondition = [];
  console.log(otherData);
  if (searchTerm) {
    andCondition.push({
      OR: AcademicFacultySearchableField.map(field => ({
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

  const whereCondition: Prisma.AcademicFacultyWhereInput = andCondition.length
    ? { AND: andCondition }
    : {};
  const result = await prisma.academicFaculty.findMany({
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

const getDataById = async (id: string): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: { id: id },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<AcademicFaculty>
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.delete({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicFacultyService = {
  insertIntoDb,
  getAllFromDb,
  getDataById,
  updateOneInDB,
  deleteByIdFromDB,
};
