
export const calculateOrderCost = (cartItem)=>{

  const itemsPrice = cartItem.reduce(
    (acc,item)=> acc + item?.price * item?.quantity,
    0
  )

  const shippingPrice = itemsPrice > 200 ? 0 : 25 ;
  const taxPrice = Number(( 0.15 * itemsPrice).toFixed(2))
  const totalPrice = itemsPrice + shippingPrice + taxPrice

  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  }


}