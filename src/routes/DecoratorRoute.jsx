import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";

const DecoratorRoute = ({ children }) => {
  const { loading, user } = useAuth();
  //   const { role, roleLoading } = useRole();

  //   if (loading || !user || roleLoading) {
  //     return <Loading></Loading>;
  //   }

  //   if (role !== "decorator") {
  //     return <Forbidden></Forbidden>;
  //   }

  return children;
};
export default DecoratorRoute;
