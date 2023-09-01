import { Router, Request, Response } from "express";
import { ArchitectureStyleController } from "src/controllers/architectureStyle.controller";
import api from "../../constants";
import authenticate from "../../middleware/authenticaton.middleware";
import { match } from "../../utils/either";
import { sendErrorResponse } from "../../utils";
import { CustomException } from "../../models/exceptions/custom.exception";
import { getErrorMessage } from "../../utils/error";
import { CreateArchitectureStyleInput, UpdateArchitectureStyleInput } from "src/models/api/architectureStyle";

export const architectureStyleRouter = (router: Router, controller: ArchitectureStyleController): void => {

	router.get(api.ARCHITECTURE_STYLES, authenticate, async (request: Request, response: Response) => {
		try {
			const result = await controller.getAll(request.query);
			match(
				result,
				(getArchitectureStylesOutput) => response.json(getArchitectureStylesOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	router.post(api.ARCHITECTURE_STYLES, authenticate, async (request: Request, response: Response) => {
		try {
			const input = request.body as CreateArchitectureStyleInput;
			const result = await controller.create(input);
			match(
				result,
				(createArchitectureStyleOutput) => response.status(201).json(createArchitectureStyleOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	router.delete(api.ARCHITECTURE_STYLES + "/:id", authenticate, async (request: Request, response: Response) => {
		try {
			const id = request.params.id;
			const result = await controller.delete(id!);
			match(
				result,
				(deleteArchitectureStyleOutput) => response.json(deleteArchitectureStyleOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	router.put(api.ARCHITECTURE_STYLES + "/:id", authenticate, async (request: Request, response: Response) => {
		try {
			const input = request.body as UpdateArchitectureStyleInput;
			const id = request.params.id;
			const result = await controller.update(id!, input);
			match(
				result,
				(updateArchitectureStyleOutput) => response.json(updateArchitectureStyleOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});
};
