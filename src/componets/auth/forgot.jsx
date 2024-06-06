import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/auth/actions/forgot-password";

const Forgot = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    const { email } = formData;
    try {
      const response = await dispatch(forgotPassword(email));
      if (response.data.success === true) {
        window.location.href = "https://mail.google.com/mail"; // Điều hướng trang bằng cách thay đổi window.location.href
      } else {
        // Xử lý khi gửi email không thành công
        console.error("Send mail Error:", response);
      }
    } catch (error) {
      // Xử lý khi có lỗi xảy ra
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto mt-32 items-center justify-center">
      <div className="py-16">
        <div className="max-w-lg bg-gray-50 text-black mx-auto shadow px-6 py-7 rounded-xl overflow-hidden">
          <div>
            <div className="space-y-2">
              <h2 className="text-2xl text-center font-bold uppercase mb-1">
                Forgot password
              </h2>
              <div>
                <label htmlFor="email" className=" text-black mb-2 block">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                 onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                  placeholder="youremail.@domain.com"
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={handleClick}
                className="block w-full py-2 text-center text-white rounded-xl bg-black border border-primary hover:bg-red-500 hover:text-primary transition uppercase font-roboto font-medium"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
