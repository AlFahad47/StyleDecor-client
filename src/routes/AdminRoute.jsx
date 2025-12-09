import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    return <h2>User error</h2>;
  }

  return children;
};

export default AdminRoute;
