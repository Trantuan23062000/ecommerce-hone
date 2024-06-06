import React, { useState, useEffect } from "react";
import { getBanner } from "../../api/banner/get";
const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBanner = async () => {
      const response = await getBanner();
      if (response.data.EC === 0) {
        setData(response.data.data);
      } else {
        console.log("no data !");
      }
    };
    fetchBanner();
  }, []);



  useEffect(() => {
    if (data.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [data]);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="relative bg-cover bg-no-repeat mt-20 bg-center py-36 md:py-96"
      style={{
        backgroundImage: `url('${data[currentImageIndex].URL}')`,
      }}
    >
    </div>
  );
};

export default Banner;
