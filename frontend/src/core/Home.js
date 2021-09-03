// import React, { useEffect, useState } from "react";
// import API from "../backend";
// import Base from "./Base";
// import Card from "./Card";
// import { getProduct } from "./helper/coreapicalls";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(false);

//   const loadAllproducts = () => {
//     getProduct().then((data) => {
//       if (data.error) {
//         setError(data.error);
//       } else {
//         setProducts(data);
//       }
//     });
//   };

//   useEffect(() => {
//     loadAllproducts();
//   });

//   return (
//     <Base title="Home Page" description="Welcome in our eCommerse Web">
//       <div className="container mx-auto">
//         <div className="row  ">
//           <div className="d-flex flex-wrap justify-content-center align-items-start">
//             {products.map((product, index) => {
//               return <Card product={product} key={index} />;
//             })}
//           </div>
//         </div>
//       </div>
//     </Base>
//   );
// };

// export default Home;
