import { Router, Request, Response } from "express";
import { ArchitectController } from "src/controllers/architect.controller";
import api from "../../constants";
import authenticate from "../../middleware/authenticaton.middleware";
import { match } from "../../utils/either";
import { sendErrorResponse } from "../../utils";
import { CustomException } from "../../models/exceptions/custom.exception";
import { getErrorMessage } from "../../utils/error";
import { CreateArchitectInput } from "src/models/api/architect";

export const architectRouter = (router: Router, controller: ArchitectController): void => {

	router.get(api.ARCHITECTS, authenticate, async (request: Request, response: Response) => {
		try {
			const result = await controller.getAll(request.query);
			match(
				result,
				(getPostsOutput) => response.json(getPostsOutput),
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

	router.delete(api.ARCHITECTS);
};
