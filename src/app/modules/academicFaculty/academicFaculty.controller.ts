import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AcademicFacultyService } from "./academicFaculty.service";
import pick from "../../../shared/pick";
import { AcademicFacultySearchableField, AcdemicFacultyOptions } from "./academicFaculty.constant";
import httpStatus from "http-status";



const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.insertIntoDb(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Inserted data succefully',
      data: result,
    });
  });

  const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, AcademicFacultySearchableField);
    const options = pick(req.query, AcdemicFacultyOptions);
  
    const result = await AcademicFacultyService.getAllFromDb(filters, options);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Faculty fetch succefully',
      meta: result.meta,
      data: result.data,
    });
  });


  const getDataById = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.getDataById(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Retrive data succefully',
      data: result,
    });
  });

  const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicFacultyService.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicFaculty updated successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicFacultyService.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicFaculty delete successfully',
        data: result
    });
});


  export const AcademicFacultyController = {
    insertIntoDb,getAllFromDb,getDataById,updateOneInDB,deleteByIdFromDB
  }