import { Router, Request, Response } from "express";
import { CountryController } from "../../controllers/country.controller";
import api from "../../constants";
import authenticate from "../../middleware/authenticaton.middleware";
import { CustomException } from "../../models/exceptions/custom.exception";
import { sendErrorResponse } from "../../utils";
import { getErrorMessage } from "../../utils/error";
import { match } from "../../utils/either";

export const countryRouter = (router: Router, controller: CountryController): void => {

	router.get(api.COUNTRIES, authenticate, async (request: Request, response: Response) => {
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