import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IRootState } from "../main";
import { useDispatch, useSelector } from "react-redux";
import {
  Select_Product,
  Remove_SelectedProduct,
} from "../features/selectedProduct";
export const ProductDetail = () => {
  const product = useSelector(
    (state: IRootState) => state.selectproduct.product
  );

  const { id, title, price, image, category, description } = product;
  const { productId } = useParams();
  const dispatch = useDispatch();
  console.log(productId);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        dispatch(Select_Product(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (productId && productId !== "") fetchDetail();
    return () => {
      dispatch(Remove_SelectedProduct());
      console.log("remove");
    };
  }, [productId]);

  return (
    <div className="ui grid container" style={{ marginTop: "20px" }}>
      {id === -1 ? (
        <div>...Loading</div>
      ) : (
        <>
          <div className="ui placeholder segment">
            <div className="ui two column stackable center aligned grid">
              <div className="ui vertical divider">AND</div>
              <div className="middle aligned row">
                <div className="column lp">
                  <img src={image} alt={title} />
                </div>
                <div className="column rp">
                  <h1>{title}</h1>
                  <h2>
                    <a className="ui teal tag label">${price}</a>
                  </h2>
                  <h3 className="ui brown block header">{category} </h3>
                  <p>{description}</p>
                  <div className="ui vertical animated button">
                    <div className="hidden content">
                      <i className="shop icon"></i>
                    </div>
                    <div className="visible content">Add to Cart</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
