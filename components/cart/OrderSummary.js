import { useCart } from "@/context/cart";
import Image from "next/image";

export default function OrderSummary() {
  const { cartItems } = useCart();

  const calculateTotal = () => {
    return cartItems?.reduce(
      (total, item) => total + item?.product?.price * item?.quantity,
      0
    );
  };

  const totalItems = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const itemOrItems = totalItems === 1 ? "item" : "items";

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <p className="text-xl font-semibold mb-4">Order Summary</p>
      <ul className="flex flex-col gap-4">
        {cartItems?.map((product) => (
          <li
            className="border rounded-lg overflow-hidden"
            key={product?.product?._id}
          >
            <div className="flex">
              <div className="w-32 h-32 overflow-hidden">
                <Image
                  src={
                    product?.product?.images?.[0]?.secure_url ||
                    "/images/default.jpeg"
                  }
                  className=""
                  layout="responsive"
                  width={400}
                  height={300}
                  objectFit="cover"
                  alt={product?.product?.title}
                />
              </div>
              <div className="flex flex-col justify-between p-2">
                <p className="font-semibold">{product?.product?.title}</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">
                    ${product?.product?.price?.toFixed(2)}
                  </p>
                  <p className="text-gray-600">Qty: {product?.quantity}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600">
          Total {totalItems} {itemOrItems}:
        </p>
        <p className="text-2xl font-semibold">${calculateTotal().toFixed(2)}</p>
      </div>
    </div>
  );
}
