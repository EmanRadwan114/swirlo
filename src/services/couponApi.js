
import api from "../utils/apiUrl";

//just a js file for storing api methods related to coupon
export const applyCoupon = async (couponCode) => {
  const response = await api.post("/coupons/apply-coupon", couponCode);
  return response.data;
};


// {
//   "couponCode": "Doaa123"
// }
