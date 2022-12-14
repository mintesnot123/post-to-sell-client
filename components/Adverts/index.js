import { useState, useEffect } from "react";
import AdvertItem from "./AdvertItem";
import { api_getAllAdverts } from "../../api/index";
import ProductLoadingColumn from "../../components/products-content/list/loading/ProductLoadingColumn";
function Adverts() {
  const [allAdverts, setAllAdverts] = useState([]);
  useEffect(async () => {
    const res = await api_getAllAdverts();
    setAllAdverts(res.data);
  }, []);
  return (
    <div className="adverts_container">
      <header
        style={{
          marginTop: "40px",
          fontWeight: "300",
          fontSize: "29px",
          borderRadius: "2px",
          paddingBottom: "12px",
        }}
      >
        <h2
          style={{
            fontWeight: "300",
            fontSize: "29px",
            padding: "15px 10px",
          }}
        >
          Adverts
        </h2>
      </header>
      <div
      // style={{
      //   paddingRight: "20px",
      //   borderRight: "solid 1px #cdcdcd",
      // }}
      >
        {allAdverts.length !== 0 ? (
          allAdverts.map(
            (advert, index) =>
              advert.status === "active" && (
                <AdvertItem key={index} advert={advert} />
              )
          )
        ) : (
          <ProductLoadingColumn />
        )}
      </div>
    </div>
  );
}

export default Adverts;
