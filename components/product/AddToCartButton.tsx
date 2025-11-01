"use client";

import { Product } from '@/sanity.types';
import useCartStore from '@/store/cart-store';
import { Button } from '../ui/button';

type SelectedOptions = Record<string, string>;

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
  className?: string;
  selectedOptions?: SelectedOptions;
}

function AddToCartButton({
  product,
  disabled,
  className,
  selectedOptions = {},
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleClick = () => {
    // Add one item of this product with the current selectedOptions
    addItem(product, { selectedOptions, quantity: 1 });
  };

  return (
    <Button
      disabled={disabled}
      className={className}
      onClick={handleClick}
      aria-label="Add to cart"
    >
      কার্টে নিন
    </Button>
  );
}

export default AddToCartButton;
