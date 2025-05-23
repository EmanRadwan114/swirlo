import HomeHero from "../../components/HomeHero/HomeHero";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ProductDetails from "../ProductDetails/ProductDetails";
import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <HomeHero></HomeHero>
      <Link to={"/checkout"}>
        <button>checkout</button>
      </Link>
      <CategoryCard></CategoryCard>
    </>
  );
}
