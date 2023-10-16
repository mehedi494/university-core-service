import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';
import { AcademicDepartmentSearchableField } from './academicDepartment.constant';
import { paginationFields } from '../../../constants/pagination';
import httpStatus from 'http-status';



const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Inserted data succefully',
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicDepartmentSearchableField);
  const options = pick(req.query, paginationFields);

  const result = await AcademicDepartmentService.getAllFromDb(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrive data succefully',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrive data succefully',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.updateOneInDB(id, req.body);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicDepartment updated successfully',
      data: result
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.deleteByIdFromDB(id);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicDepartment delete successfully',
      data: result
  });
});

export const AcademicDepartmentController = {
  insertIntoDb,
  getAllFromDb,
  getDataById,
  updateOneInDB,
  deleteByIdFromDB
};
