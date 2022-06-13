import {responseStatus} from '../common/constants'

export default function getResponse(result) {
  const data = result.data
  if (data.httpStatusCode === responseStatus.success) {
    return {ok: true, data: data.entity || data}
  } else {
    return {ok: false, errors: data.errors}
  }
}
