import { useState } from "react";
import Link from "next/link";

const ProductItemLoading = ({
  discount,
  productImage,
  name,
  price,
  currentPrice,
}) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFav = () => {
    setIsFavourite(!isFavourite);
  };
  return (
    <a href="#" className="product-item product-item--loading">
      <div className="product__image">
        <button
          type="button"
          onClick={toggleFav}
          className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
        >
          <i className="icon-heart"></i>
        </button>
        {productImage && (
          <Link href={`#`}>
            <a>
              <img src={productImage} alt="product" />
              {discount && (
                <span className="product__discount">{discount}%</span>
              )}
            </a>
          </Link>
        )}
      </div>

      <div className="product__description">
        {name && name !== "" ? <h3>{name}</h3> : <h3></h3>}
        {currentPrice && currentPrice !== "" ? (
          <div
            className={
              "product__price " + (discount ? "product__price--discount" : "")
            }
          >
            <h4>${currentPrice}</h4>

            {discount && <span>${price}</span>}
          </div>
        ) : (
          <div className={"product__price"}>
            <h4></h4>
          </div>
        )}
      </div>
    </a>
  );
};

export default ProductItemLoading;