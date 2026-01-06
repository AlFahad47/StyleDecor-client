import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (data) => {
    console.log("form data", data);
    signInUser(data.email, data.password)
      .then((result) => {
        toast.success("Signin successful");
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  const handleDemoLogin = (role) => {
    // Fill these with REAL credentials you created in your DB
    if (role === "admin") {
      setValue("email", "admin@gmail.com"); // Use react-hook-form setValue or state
      setValue("password", "Aa@111");
    } else {
      setValue("email", "user@user.com");
      setValue("password", "@123#Aa");
    }
  };
  return (
    <div className="h-[70vh] flex justify-center items-center ">
      <StyledWrapper>
        <div className=" bg-base-200  w-[320px] mx-auto rounded-xl ">
          <form className="form " onSubmit={handleSubmit(handleLogin)}>
            <span className="title">Login</span>
            <span className="subtitle">Login in to your account.</span>
            <div className="form-container">
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}

              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer{" "}
                </p>
              )}
            </div>
            <button>Login</button>
            <div className="flex  gap-2 mb-4">
              <button
                type="button"
                onClick={() => handleDemoLogin("admin")}
                className="btn btn-sm btn-outline btn-info flex-1 "
              >
                Demo Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("user")}
                className="btn btn-sm btn-outline btn-success flex-1"
              >
                Demo User
              </button>
            </div>
          </form>
          <div className="form-section rounded-b-xl">
            <p>
              Don't have an account? <Link to="/register">Register</Link>{" "}
            </p>
          </div>
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .form-box {
    max-width: 300px;
    background: #f1f7fe;
    overflow: hidden;
    border-radius: 16px;
    color: #010101;
  }

  .form {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 32px 24px 24px;
    gap: 16px;
    text-align: center;
  }

  /*Form text*/
  .title {
    font-weight: bold;
    font-size: 1.6rem;
  }

  .subtitle {
    font-size: 1rem;
    color: #666;
  }

  /*Inputs box*/
  .form-container {
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff;
    margin: 1rem 0 0.5rem;
    width: 100%;
  }

  .input {
    background: none;
    border: 0;
    outline: 0;
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
    padding: 8px 15px;
  }

  .form-section {
    padding: 16px;
    font-size: 0.85rem;
    background-color: #e0ecfb;
    box-shadow: rgb(0 0 0 / 8%) 0 -1px;
  }

  .form-section a {
    font-weight: bold;
    color: #0066ff;
    transition: color 0.3s ease;
  }

  .form-section a:hover {
    color: #005ce6;
    text-decoration: underline;
  }

  /*Button*/
  .form button {
    background-color: #0066ff;
    color: #fff;
    border: 0;
    border-radius: 24px;
    padding: 10px 16px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .form button:hover {
    background-color: #005ce6;
  }
`;
export default Login;
