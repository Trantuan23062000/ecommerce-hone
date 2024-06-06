import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/actions/authActions";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get history object

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => { // Make the function asynchronous
    e.preventDefault();
    const { email, password } = formData;
    try {
      const response = await dispatch(loginUser(email, password)); // Wait for loginUser to finish
      if (response && response.data && response.data.EC === 0) {
        navigate("/"); // Redirect to shop page on successful login
      } else {
        // Handle login failure
        console.error("Login failed:", response);
        // Display error message to the user
      }
    } catch (error) {
      // Handle login error
      console.error("Error logging in:", error);
      // Display error message to the user
    }
    }

  return (
    <div className="container mx-auto mt-24 items-center justify-center">
      <div className="py-16">
        <div className="max-w-lg bg-gray-50 text-black mx-auto shadow px-6 py-7 rounded-xl overflow-hidden">
          <div>
            <div className="space-y-2">
              <h2 className="text-2xl text-center font-bold uppercase mb-1">
                Login
              </h2>
              <div>
                <label htmlFor="email" className=" text-black mb-2 block">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                  placeholder="youremail.@domain.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-black mb-2 block">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                  placeholder="*******"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="text-black focus:ring-0 cursor-pointer rounded-xl"
                />
                <label
                  htmlFor="remember"
                  className="text-black ml-3 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <div className="text-black hover:text-blue-500">
                <Link to="/forgot-password">Forgot password</Link>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                type="submit"
                className="block w-full py-2 text-center text-white rounded-xl bg-black border border-primary hover:bg-red-500 hover:text-primary transition uppercase font-roboto font-medium"
              >
                Login
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-center relative">
            <div className="text-black uppercase px-3 bg-white z-10 relative">
              Or login with
            </div>
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="w-1/2 py-2 text-center rounded-xl text-white bg-blue-800 uppercase hover:bg-black font-roboto font-medium text-sm">
              facebook
            </div>
            <div className="w-1/2 py-2 text-center rounded-xl text-white bg-red-600  uppercase font-roboto font-medium text-sm hover:bg-blue-500">
              google
            </div>
          </div>
          <div></div>
          <div className="mt-4 text-center text-black">
            Don't have account?{" "}
            <div className="text-blue-500 hover:text-red-500">
              <Link to="/register">Register now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
