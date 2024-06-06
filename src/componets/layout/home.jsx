import React, { useEffect } from "react";
import Banner from "../home/banner";
import Brand from "../home/Brand";
import Arrival from "../home/arrival";
import RelatedProduct from "../product/relatedProduct";
import { verifyToken } from "../../redux/auth/actions/authActions";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from "../../redux/auth/reducers/authReducer";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (user && user.email) {
      if (userToken) {
        dispatch(verifyToken(user.email, userToken));
      } else {
        localStorage.removeItem("user")
        window.location.reload()
      }
    }
    // eslint-disable-next-line
  }, [dispatch, user]);
  return (
    <>
      <Banner />
      <Brand />
      <Arrival />
      <div className="container mx-auto flex flex-col mt-20">
        <RelatedProduct />
      </div>
    </>
  );
};

export default Home;
