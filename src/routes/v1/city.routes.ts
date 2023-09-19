import { Router, Request, Response } from "express";
import { CityController } from "../../controllers/city.controller";
import api from "../../constants";
import authenticate from "../../middleware/authenticaton.middleware";
import { CustomException } from "../../models/exceptions/custom.exception";
import { sendErrorResponse } from "../../utils";
import { getErrorMessage } from "../../utils/error";
import { match } from "../../utils/either";

export const cityRouter = (router: Router, controller: CityController): void => {

	router.get(api.CITIES, authenticate, async (request: Request, response: Response) => {
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
};