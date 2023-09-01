import { Router, Request, Response } from "express";
import { ArchitectController } from "src/controllers/architect.controller";
import api from "../../constants";
import authenticate from "../../middleware/authenticaton.middleware";
import { match } from "../../utils/either";
import { sendErrorResponse } from "../../utils";
import { CustomException } from "../../models/exceptions/custom.exception";
import { getErrorMessage } from "../../utils/error";
import { CreateArchitectInput, UpdateArchitectInput } from "src/models/api/architect";

export const architectRouter = (router: Router, controller: ArchitectController): void => {

	router.get(api.ARCHITECTS, authenticate, async (request: Request, response: Response) => {
		try {
			const result = await controller.getAll(request.query);
			match(
				result,
				(getArchitectsOutput) => response.json(getArchitectsOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	router.post(api.ARCHITECTS, authenticate, async (request: Request, response: Response) => {
		try {
			const input = request.body as CreateArchitectInput;
			const result = await controller.create(input);
			match(
				result,
				(createArchitectOutput) => response.status(201).json(createArchitectOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	router.delete(api.ARCHITECTS + "/:id", authenticate, async (request: Request, response: Response) => {
		try {
			const id = request.params.id;
			const result = await controller.delete(id!);
			match(
				result,
				(deleteArchitectOutput) => response.json(deleteArchitectOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	router.put(api.ARCHITECTS + "/:id", authenticate, async (request: Request, response: Response) => {
		try {
			const input = request.body as UpdateArchitectInput;
			const id = request.params.id;
			const result = await controller.update(id!, input);
			match(
				result,
				(updateArchitectOutput) => response.json(updateArchitectOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});
};
