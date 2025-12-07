import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Services from "../pages/Shared/Services/Services";
import ServiceDetails from "../pages/Shared/Services/ServiceDetails";
import CoverageMap from "../pages/Home/CoverageMap";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import MyProfile from "../pages/MyProfile/MyProfile";
import MyBookings from "../pages/MyBookings/MyBookings";
import Payment from "../pages/Payment/Payment";
import PaymentHistory from "../pages/Payment/PaymentHistory";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import DecoratorRoute from "./DecoratorRoute";
import AssignedProjects from "../pages/Dashboard/AssignedProjects/AssignedProjects";
import DecoratorSchedule from "../pages/Dashboard/DecoratorSchedule/DecoratorSchedule";
import AdminRoute from "./AdminRoute";
import AdminStatistics from "../pages/AdminStatistics/AdminStatistics";
import UsersManagement from "../pages/UsersManagement/UsersManagement";
import ManageDecorators from "../pages/Manage/ManageDecorators";
import ManageServices from "../pages/Manage/ManageServices";
import ManageBookings from "../pages/Manage/ManageBookings";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "services",
        Component: Services,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "services/:id",
        Component: ServiceDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/services/${params.id}`),
      },
      {
        path: "coverage-map",
        Component: CoverageMap,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  // auth
  {
    path: "/",
    Component: AuthLayout,
    children: [],
  },

  // dashboard
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // common
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "profile",
        Component: MyProfile,
      },

      // user
      {
        path: "my-bookings",
        Component: MyBookings,
      },
      {
        path: "payment/:bookingId",
        Component: Payment,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },

      // decorator
      {
        path: "assigned-projects",
        element: (
          <DecoratorRoute>
            <AssignedProjects />
          </DecoratorRoute>
        ),
      },
      {
        path: "schedule",
        element: (
          <DecoratorRoute>
            <DecoratorSchedule />
          </DecoratorRoute>
        ),
      },

      // admin
      {
        path: "statistics",
        element: (
          <AdminRoute>
            <AdminStatistics />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
      {
        path: "manage-decorators",
        element: (
          <AdminRoute>
            <ManageDecorators />
          </AdminRoute>
        ),
      },
      {
        path: "manage-services",
        element: (
          <AdminRoute>
            <ManageServices />
          </AdminRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <AdminRoute>
            <ManageBookings />
          </AdminRoute>
        ),
      },
    ],
  },
]);
