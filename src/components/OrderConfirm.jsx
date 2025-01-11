import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext';
import ShowOrderproduct from './ShowOrderproduct';

const OrderConfirm = () => {
     const {userOrder} = useContext(AppContext)
     const [latestOrder, setLatestorder] = useState({});
//console.log("User Order", userOrder);

     useEffect(() => {
       if(userOrder){
          setLatestorder(userOrder[0]);
       }
     }, [userOrder])
   //  console.log("Latest order" , latestOrder.orderItems[0]);
     
  return (
    <>
    <div className="container my-5">
     <h1 className='text-center'>Your Order has been Confirm</h1>
     <h1 className='text-center'>It will delevered soon</h1>


     <div className="container">
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                Order Items
              </th>
              <th scope="col" className="text-center">
                Order Details & Shipping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">
             <ShowOrderproduct latestOrder={latestOrder?.orderItems} />
              </td>
              <td>
                <ul>
                  <li>Payement Status: {latestOrder?.payStatus}</li> <br />
                  <li>Name: {latestOrder?.userShipping?.fullName}</li> <br />
                  <li>Phone: {latestOrder?.userShipping?.phoneNumber}</li> <br />
                  <li>Country: {latestOrder?.userShipping?.country}</li> <br />
                  <li>State: {latestOrder?.userShipping?.state}</li> <br />
                  <li>City: {latestOrder?.userShipping?.city} </li> <br />
                  <li>Pincode: {latestOrder?.userShipping?.pincode}</li> <br />
                  <li>Near By: {latestOrder?.userShipping?.address} </li> <br />
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
      order
    </>
  )
}

export default OrderConfirm
