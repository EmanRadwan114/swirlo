import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ProductDetails from "../ProductDetails/ProductDetails";
import { Link } from "react-router";

export default function Home() {
  return <>
  Home
   <Link to={'/checkout'} >
     <button>checkout</button>
    </Link>
    <CategoryCard></CategoryCard>
  </>

}


