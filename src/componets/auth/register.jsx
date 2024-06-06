import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { RegisterUser } from "../../api/auth/register";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    username:'',
    phone:'',
    password:'',
    email:'',
    confirmPassword: '',

  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {password,confirmPassword } = formData;
    if (password !== confirmPassword) {
      // Nếu mật khẩu và mật khẩu xác nhận không khớp
     toast.error("Passwords do not match")
    } else {
      const response = await RegisterUser(formData)
      if(response && response.data && response.data.EC === 0){
        toast.success(response.data.message)
        navigate('/login')
      }else{
        toast.error(response.data.message)
      }
    }
  };

  return (
    <div>
      <div className="container mx-auto items-center justify-center mt-12">
        <div className="py-16">
          <div className="max-w-lg bg-gray-50 text-black mx-auto shadow px-6 py-7 rounded-xl overflow-hidden">
            <div>
              <div className="space-y-2">
                <h2 className="text-2xl text-center font-bold uppercase mb-1">
                  Register
                </h2>
                <div>
                  <label htmlFor="username" className=" text-black mb-2 block">
                    Username
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="username"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <label htmlFor="email" className=" text-black mb-2 block">
                    Email
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                    placeholder="youremail.@domain.com"
                  />
                </div>
                <div>
                  <label htmlFor="email" className=" text-black mb-2 block">
                    Phone number 
                  </label>
                  <input
                    onChange={handleChange}
                    type="number"
                    name="phone"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                    placeholder="+84 0123456789"
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
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-black mb-2 block">
                    Password Confirm
                  </label>
                  <input
                  onChange={handleChange}
                    type="password"
                    name="confirmPassword"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
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
                <div className="text-primary">Forgot password</div>
              </div>
              <div className="mt-4">
                <button
                onClick={handleSubmit}
                  type="submit"
                  className="block w-full py-2 text-center text-white rounded-xl bg-black border border-primary hover:bg-red-500 hover:text-primary transition uppercase font-roboto font-medium"
                >
                  Register
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

            <div className="mt-4 text-center text-black">
              I have account?{" "}
              <div className=" text-blue-500 hover:text-red-500">
                <Link to="/login">Login now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
