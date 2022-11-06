// import { NextFunction, Response, Request } from "express";
// import { IController } from "src/controllers/base.controller";

// interface PaginationResult<T> {
//     totalCount: number;
//     totalPages: number;
//     data: T[];
// }

// const DEFAULT_PAGE = 1;
// const DEFAULT_LIMIT = 10;

// function paginateFilterSort<T>(controller: IController<T>) {
//     return async (req: Request, res: Response, nextFn: NextFunction): Promise<void> => {
//         const reqPage = req.query.page?.toString();
//         const page = reqPage ? parseInt(reqPage) : DEFAULT_PAGE;
//         const reqLimit = req.query.limit?.toString();
//         const limit = reqLimit ? parseInt(reqLimit) : DEFAULT_LIMIT;

//         const startIndex = (page - 1) * limit;

//         try {
//             const totalCount = await model.countDocuments().exec();
//             const totalPages = Math.ceil(totalCount / limit);
//             const data = await model.find().limit(limit).skip(startIndex);

//             const paginationResult: PaginationResult<T> = { totalCount, totalPages, data };
//             res.locals.paginationResult = paginationResult;
//             nextFn();
//         } catch (e) {
//             res.status(500).json({ message: e.message });
//         }
//     };
// }

// export default paginateFilterSort;