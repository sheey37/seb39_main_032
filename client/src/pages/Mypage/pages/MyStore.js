import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import StoreInfo from "./StoreInfo";
import Firstselling from "./Firstselling";

function MyStore() {
  const API_URL = process.env.REACT_APP_API_URL;
  const accessToken = localStorage.getItem("accessToken");
  // axios.defaults.headers.common["authorization"] = accessToken;

  const [hasStoreInfo, setHasStoreInfo] = useState(false);
  const [storeInfo, setStoreInfo] = useState({});
  const [hasItems, setHasItems] = useState(false);

  const getStoreInfo = () => {
    axios
      .get(`${API_URL}/api/markets/myMarket?page=1&size=30`, {
        headers: {
          authorization: accessToken,
        },
      })
      .then((res) => {
        if (res.data.data.length === 0) {
          return setHasStoreInfo(false);
        } else {
          setStoreInfo(res.data.data[0]);
          setHasStoreInfo(true);
          localStorage.setItem("marketId", res.data.data[0].marketId);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStoreInfo();
  }, []);

  return (
    <Outer>
      <Header />
      <MyStoreContainer>
        {hasStoreInfo ? <StoreInfo storeInfo={storeInfo} /> : <Firstselling />}
      </MyStoreContainer>
      <Footer />
    </Outer>
  );
}

export default MyStore;

const Outer = styled.main`
  display: flex;
  flex-direction: column;
`;

const MyStoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; // 조절 필요
`;
