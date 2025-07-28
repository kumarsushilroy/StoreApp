import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import Userlayout from "../components/Userlayout";
import Shimer from "../components/Shimer";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { fetchProducts } from "../Store/productSlice";
import { useSearchParams } from "react-router-dom";

const Homepage = () => {
 
  let [searchParams] = useSearchParams();
  const keyword = searchParams.get('search')||''
  const companyVal = searchParams.get('company')||''
  console.log('keyworddd', keyword)
  const dispatch = useDispatch();
  
 const {cartItem} = useSelector((state)=>state.cartSlice);
 
 

 
  const [data, setData] = useState([]);
  const [searchVal, setsearchVal] = useState("");
  const [filterVal , setFilterVal] = useState('');
  const [companies , setCompanies] = useState([]);

  const [page, setPage] = useState(1);
  const [pageCount, setpageCount] = useState(0);

  const [filteredCategoryData , setFilteredCategoryData] = useState([]);
  const navigate = useNavigate();

  
       
      
 

  
const {products, isLoading, error} = useSelector((state)=>state.product);

let companyData = products?.products

const getCompanyList = ()=>{
 let uniqueCompanies = companyData?.reduce((acc,curr)=>{
     if(!acc.includes(curr.company)){
      acc.push(curr.company)
      
     }
     return acc
  },[])

  console.log('cccccc', uniqueCompanies)
   setCompanies(uniqueCompanies);
   console.log('StateVallll', companies)
}

useEffect(()=>{
getCompanyList()
},[companyData])

const params = {keyword,companyVal,page}

 useEffect(()=>{
    dispatch(fetchProducts(params));
  },[dispatch,keyword,companyVal])

   const handleSubmitForSearch = (e)=>{
    e.preventDefault();
    if(searchVal?.trim()){
      navigate(`/?search=${searchVal}`)
    }else{
      navigate('/')
    }
    
   }

   console.log('dataas== ',products.products)
   
  console.log('Loadingggg== ', isLoading)
  console.log('ERRORRRR== ', error)

  const handleFilterChange = (e)=>{
    const selectedCompany = e.target.value
    setFilterVal(selectedCompany);
    console.log('filterVAL==', selectedCompany)
    navigate(`/?company=${selectedCompany}`)
  }

  // find the duplicate number 
//  const arr = [2,3,2,4,2,5,4,8,9];
//  const filtered = arr.filter((ele,index,arr)=>arr.indexOf(ele)!==index);
//  console.log('FILTEREDDD== ', filtered)


// find the missing element in an array............................................................
//  const numArr = [1,3,6,7,9,12,14]
//  const missingNum = []

//  const findMissingNum = (arr)=>{
//    const minNum = Math.min(...arr);
//    const maxNum = Math.max(...arr);
//    for(let i=minNum; i<=maxNum; i++){
//      if(arr.indexOf(i)<0){
//       missingNum.push(i);
//      }
    
//    }
//     return missingNum
//  }
//  console.log('MISSINGNUM--- ',findMissingNum(numArr))

// find the maximum and minimum num in array..................................................
// const numArr = [3,4,9,23,87]
 // simple method......

// const minNum = Math.min(...numArr);
// const maxNum = Math.max(...numArr);
// console.log('Nummm',maxNum)

// other method..........

// const findMinandMax = (arr)=>{
//   return arr.reduce((acc,curr)=>{
//    return acc>curr?acc:curr
//   })
// };
//  console.log(findMinandMax(numArr))

 // find the even number in given array....................................................
//  const numArr = [2,3,4,6,8,10];

//  const evenNum = numArr.filter((item)=>{
//   return item%2!==0
//  })

//  console.log(evenNum)

// find the sum of number.......................................................
// const arrNum = [3,4,5,5];

// const sumNo = arrNum.reduce((acc,curr)=>{
//   return acc+curr
// });
// console.log('SUMNO== ', sumNo)

 const alpha = (word)=>{
   const val = word.split('').reverse().join('')
   if(word==val){
    console.log('word is pallindrome')
   }else{
    console.log('not pallindrome')
   }
 }

 console.log('valueee ',alpha('noon'))




 



  return (
    <>
    {
      isLoading? <Shimer/>:(
 <div className="row">
        <div className="col-md-3 border">
         
          <select onChange={handleFilterChange}  id="">
            <option value="">Select Company</option>
            {
              companies?.map((item,i)=>(
                <option value={item} key={i}>{item}</option>
              ))
            }
          </select>
        </div>
        <div className="col-md-5 border">
         
          <form onSubmit={handleSubmitForSearch}>
          <input
            onChange={(e) => setsearchVal(e.target.value)}
            className="w-100 p-3"
            placeholder="search...."
            type="text"
            value={searchVal}
          />

          
          </form>

         
        </div>

        <div className="col-md-4">
           <button onClick={handleSubmitForSearch} className="btn btn-primary mt-2 w-full p-2 ">Search</button>
         
        </div>

        {products?.products?.map((item, index) => {
          return (
            <div key={index} className="col-md-3 p-1">
              <ProductCard item={item} key={index} />
            </div>
          );
        })}
      </div>
      )
    }
     
    </>
  );
};

export default Homepage;
