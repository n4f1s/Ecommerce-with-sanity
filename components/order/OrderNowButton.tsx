"use client";

import { Product } from '@/sanity.types';
import { Button } from '../ui/button';
import useCartStore from '@/store/cart-store';
import { useRouter } from 'next/navigation';

type SelectedOptions = Record<string, string>;

interface OrderNowButtonProps {
  product: Product;
  disabled?: boolean;
  className?: string;
  selectedOptions?: SelectedOptions;
}

function OrderNowButton({
  product,
  disabled,
  className,
  selectedOptions = {},
}: OrderNowButtonProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const getItemCount = useCartStore((s) => s.getItemCount);

  // Count specific to this product + selection
  const itemCountForSelection = getItemCount(product._id, { selectedOptions });

  const handleOrderNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (itemCountForSelection === 0) {
      addItem(product, { selectedOptions, quantity: 1 });
    }
    router.push('/cart');
  };

  return (
    <Button
      disabled={disabled}
      className={`hithere ${className ?? ""}`}
      onClick={handleOrderNow}
      aria-label="ক্যাশ অন ডেলিভারিতে অর্ডার করুন"
    >
      ক্যাশ অন ডেলিভারিতে অর্ডার করুন
    </Button>
  );
}

export default OrderNowButton;
