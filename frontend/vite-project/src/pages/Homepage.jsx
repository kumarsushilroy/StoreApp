import { useEffect, useState, lazy, Suspense } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import Userlayout from "../components/Userlayout";
import Shimer from "../components/Shimer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../Store/productSlice";
import { useSearchParams } from "react-router-dom";

// const Load = lazy(()=>import('../pages/User/Load'));

const Homepage = () => {
  
  let [searchParams] = useSearchParams();
  const keyword = searchParams.get("search") || "";
  const companyVal = searchParams.get("company") || "";
  console.log("keyworddd", keyword);
  const dispatch = useDispatch();

  const { cartItem } = useSelector((state) => state.cartSlice);

  const [data, setData] = useState([]);
  const [searchVal, setsearchVal] = useState("");
  const [filterVal, setFilterVal] = useState("");
  const [companies, setCompanies] = useState([]);

  const [page, setPage] = useState(1);
  const [pageCount, setpageCount] = useState(0);

  const [filteredCategoryData, setFilteredCategoryData] = useState([]);
  const navigate = useNavigate();

  const { products, isLoading, error } = useSelector((state) => state.product);

  let companyData = products?.products;

 

  const getCompanyList = () => {
    let uniqueCompanies = companyData?.reduce((acc, curr) => {
      if (!acc.includes(curr.company)) {
        acc.push(curr.company);
      }
      return acc;
    }, []);

    console.log("cccccc", uniqueCompanies);
    setCompanies(uniqueCompanies);
    console.log("StateVallll", companies);
  };

  useEffect(() => {
    getCompanyList();
  }, [companyData]);

  const params = { keyword, companyVal, page };

  useEffect(() => {
    dispatch(fetchProducts(params));
  }, [dispatch, keyword, companyVal]);

  const handleSubmitForSearch = (e) => {
    e.preventDefault();
    if (searchVal?.trim()) {
      navigate(`/?search=${searchVal}`);
    } else {
      navigate("/");
    }
  };

  console.log("dataas== ", products.products);

  console.log("Loadingggg== ", isLoading);
  console.log("ERRORRRR== ", error);

  const handleFilterChange = (e) => {
    const selectedCompany = e.target.value;
    setFilterVal(selectedCompany);
    console.log("filterVAL==", selectedCompany);
    navigate(`/?company=${selectedCompany}`);
  };

  return (
    <>
      {/* {isLoading ? (
        <Shimer />
      ) : (
        <>
         <div className="col-md-2 m-2 border">
            <select className="form-control" onChange={handleFilterChange} id="">
              <option value="">Select Company</option>
              {companies?.map((item, i) => (
                <option value={item} key={i}>
                  {item}
                </option>
              ))}
            </select>
          </div>

        <div className="row p-3">
          {products?.products?.map((item, index) => {
            return (
              <div key={index} className="col-md-3">
                <ProductCard item={item} key={index} />
              </div>
            );
          })}
        </div>
     </> )
      } */}

      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-6 col-md-12">
            <h1 id="products_heading" class="text-secondary">
              Latest Products
            </h1>

            <div className="col-md-2 m-2 border">
            <select className="form-control" onChange={handleFilterChange} id="">
              <option value="">Select Company</option>
              {companies?.map((item, i) => (
                <option value={item} key={i}>
                  {item}
                </option>
              ))}
            </select>
          </div>

            <section id="products" class="mt-5">
              <div class="row">
                {isLoading ? (
                  <Shimer />
                ) : (
                  <>
                    {products?.products?.map((item, i) => (
                      <ProductCard item={item} key={i} />
                    ))}
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
