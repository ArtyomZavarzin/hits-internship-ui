import {useSelector} from 'react-redux'

export function useAuth() {
  const {userId, userData, givenName} = useSelector(state => state.auth)

  return {
    isAuth: ![null, undefined, ''].includes(userId),
    userId,
    userData,
    givenName,
    userRole: userData.role,
    companyId: userData.companyId,
    approvalState: userData.approvalState,
  }
}
