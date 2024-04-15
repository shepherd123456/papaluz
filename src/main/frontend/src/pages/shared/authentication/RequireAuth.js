import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useCtx } from '../../../hooks/context/useCtx';

function RequireAuth({ atleastRoles = ['USER'], allRoles, forbiddenRoles }) {
  const location = useLocation();
  const { ctx } = useCtx();

  const context = ctx?.accessToken ? jwtDecode(ctx.accessToken).context : undefined;
  const email = context?.email;
  const roles = context?.roles || [];

  function resolve(predicate) {
    return predicate
      ? <Outlet />
      : email
        ? <Navigate to='/unauthorized' state={{ from: location }} replace />
        : <Navigate to='/sign-in' state={{ from: location }} replace />
  }

  function isAllRoles() {
    return allRoles.every(r => roles.includes(r))
  }
  function isForbiddenRoles() {
    return !roles.find(role => forbiddenRoles.includes(role))
  }
  function isAtleastRoles() {
    return roles.find(role => atleastRoles.includes(role))
  }

  if (allRoles) {
    if (forbiddenRoles) {
      return resolve(isAllRoles() && isForbiddenRoles() && isAtleastRoles());
    } else {
      return resolve(isAllRoles() && isAtleastRoles());
    }
  } else if (forbiddenRoles) {
    return resolve(isForbiddenRoles() && isAtleastRoles());
  } else {
    return resolve(isAtleastRoles());
  }

  // return allRoles
  //   ? resolve(allRoles.every(r => roles.includes(r)))
  //   : forbiddenRoles
  //     ? resolve(!roles.find(role => forbiddenRoles.includes(role)))
  //     : resolve(roles.find(role => atleastRoles.includes(role)))
}

export default RequireAuth