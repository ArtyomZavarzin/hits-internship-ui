export const responseStatus = {
  success: 200,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  validationError: 422,
  serverError: 500,
}

export const userRoles = {
  student: 0,
  company: 1,
  admin: 3,
}

export const approvalStates = {
  pending: 0,
  submited: 1,
  rejected: 2,
}

export const applicationStates = {
  pending: 2,
  submited: 0,
  rejected: 1,
}
