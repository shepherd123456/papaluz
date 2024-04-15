import { useEffect } from "react"
import { useStore } from '../../../hooks/store/useStore';

function Payment() {
  const buyerDetails = useStore(state => state.cart.buyerDetails);

  useEffect(() => {
    console.log(buyerDetails);
  }, [buyerDetails])

  return (
    <div>Payment</div>
  )
}

export default Payment