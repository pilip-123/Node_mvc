export class BaseController {
  constructor() {
    if (new.target === BaseController) {
      throw new Error('BaseController is an abstract class and cannot be instantiated directly');
    }
  }

  success(res, message, data = null, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  error(res, message, statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message
    });
  }
}
