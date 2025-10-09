import { z } from "zod";


const validate = (schema) => async (request, response, next) => {
  try {
    const parseBody = await schema.parseAsync(request.body);
    request.body = parseBody;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map(issue => issue.message);
      const status = 422;

      const errorObj = {
        status,
        message: "Validation failed",
        extraDetails: messages
      };

      return next(errorObj); 
    }

    return next({
      status: 500,
      message: "Internal server error",
      extraDetails: ["Unexpected error occurred"]
    });
  }
};

export { validate };
