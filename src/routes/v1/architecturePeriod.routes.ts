import { Router, Request, Response } from "express";
import { ArchitecturePeriodController } from "src/controllers/architecturePeriod.controller";
import api from "../../constants";
import authenticate from "../../middleware/authenticaton.middleware";
import { match } from "../../utils/either";
import { sendErrorResponse } from "../../utils";
import { CustomException } from "../../models/exceptions/custom.exception";
import { getErrorMessage } from "../../utils/error";
import { CreateArchitecturePeriodInput, UpdateArchitecturePeriodInput } from "src/models/api/architecturePeriod";

export const architecturePeriodRouter = (router: Router, controller: ArchitecturePeriodController): void => {

	router.get(api.ARCHITECTURE_PERIODS, authenticate, async (request: Request, response: Response) => {
		try {
			const result = await controller.getAll(request.query);
			match(
				result,
				(getArchitecturePeriodsOutput) => response.json(getArchitecturePeriodsOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	router.post(api.ARCHITECTURE_PERIODS, authenticate, async (request: Request, response: Response) => {
		try {
			const input = request.body as CreateArchitecturePeriodInput;
			const result = await controller.create(input);
			match(
				result,
				(createArchitecturePeriodOutput) => response.status(201).json(createArchitecturePeriodOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	router.delete(api.ARCHITECTURE_PERIODS + "/:id", authenticate, async (request: Request, response: Response) => {
		try {
			const id = request.params.id;
			const result = await controller.delete(id!);
			match(
				result,
				(deleteArchitecturePeriodOutput) => response.json(deleteArchitecturePeriodOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	router.put(api.ARCHITECTURE_PERIODS + "/:id", authenticate, async (request: Request, response: Response) => {
		try {
			const input = request.body as UpdateArchitecturePeriodInput;
			const id = request.params.id;
			const result = await controller.update(id!, input);
			match(
				result,
				(updateArchitecturePeriodOutput) => response.json(updateArchitecturePeriodOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});
};
