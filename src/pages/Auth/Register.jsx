import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import profilePic from "../../assets/profilePic.jpg";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(profilePic);
  const {
    onChange: onFileChange,
    ref: fileRef,
    ...fileRest
  } = register("photo", { required: true });

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        if (profileImg) {
          console.log("yes available");
        }
        // 1. store the image in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2. send the photo to store and get the ul
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          // create user in the database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in the database");
            }
          });

          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(userProfile)
            .then(() => {
              // console.log('user profile updated done.')
              navigate(location.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileName(file.name);
  };
  return (
    <div className="h-[70vh] flex justify-center items-center">
      {" "}
      <StyledWrapper className="">
        <div className="form-box mx-auto">
          <form className="form" onSubmit={handleSubmit(handleRegistration)}>
            <span className="title">Sign up</span>
            <span className="subtitle">
              Create a free account with your email.
            </span>
            <div className="form-container">
              <div className="flex flex-col items-center space-y-4 p-4">
                {/* Profile Preview */}
                <img
                  src={preview}
                  className="h-18 w-18 object-cover rounded-full"
                  alt="Profile Preview"
                />

                {/* Custom File Upload */}
                <div className="flex flex-col  items-center space-y-4">
                  <label
                    htmlFor="profilePic"
                    className="cursor-pointer bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-semibold hover:bg-violet-200 transition"
                  >
                    Choose Profile Picture
                  </label>

                  {/* Hidden Input */}
                  <input
                    id="profilePic"
                    type="file"
                    {...fileRest}
                    ref={fileRef}
                    onChange={(e) => {
                      onFileChange(e);
                      loadFile(e);
                    }}
                    className="hidden"
                  />

                  <span className="text-gray-500 text-sm">{fileName}</span>
                </div>
                {errors.name?.type === "required" && (
                  <p className="text-red-500">Photo is required.</p>
                )}
              </div>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required.</p>
              )}

              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required.</p>
              )}
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                })}
                className="input"
                placeholder="Password"
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required.</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must have at least one uppercase, at least one
                lowercase, at least one number, and at least one special
                characters
              </p>
            )}
            <button>Sign up</button>
          </form>
          <div className="form-section">
            <p>
              Have an account? <Link to="/login">login</Link>{" "}
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
export default Register;
