
const Items = ({ orderList, removeItem }) => {
 
  
  return (
    <>
      <ul className="mt-5">
        {orderList?.map((item, i) => (
          <li className="bg-warning rounded p-2 m-2">
            <span className="justify-content-between d-flex">
             <span>{item.name}</span> 
              <span onClick={()=>removeItem(item.id)} className="btn border bg-danger text-light">X</span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Items;
