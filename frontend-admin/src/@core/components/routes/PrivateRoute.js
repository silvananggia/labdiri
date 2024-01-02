// ** React Imports
import { Navigate } from "react-router-dom";
import { useContext, Suspense } from "react";
import { useSelector } from "react-redux";

// ** Context Imports
import { AbilityContext } from "@src/utility/context/Can";

// ** Spinner Import
import Spinner from "../spinner/Loading-spinner";

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const ability = useContext(AbilityContext);
 // const user = useSelector((state) => state.auth.user);
  
  const user = JSON.parse(localStorage.getItem("user"));

  if (route) {
    let action = null;
    let resource = null;
    let restrictedRoute = false;

    if (route.meta) {
      action = route.meta.action;
      resource = route.meta.resource;
      restrictedRoute = route.meta.restricted;
    }
    if (!user) {
      return <Navigate to="/admin/login" />;
    }
    if (user && restrictedRoute) {
      return <Navigate to="/admin/home" />;
    }
    if (user && restrictedRoute && user.role === "public") {
      return <Navigate to="/admin/home-public" />;
    }
    if (user && !ability.can(action || "read", resource)) {
      return <Navigate to="/admin/auth/not-auth" replace />;
    }
  }

  return (
    <Suspense fallback={<Spinner className="content-loader" />}>
      {children}
    </Suspense>
  );
};

export default PrivateRoute;
