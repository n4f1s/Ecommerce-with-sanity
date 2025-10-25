"use client"

import { Product } from '@/sanity.types';
import useCartStore from '@/store/cart-store';
import { Button } from '../ui/button';



interface AddToCartQuantityProps {
    product: Product;
    disabled?: boolean;
    className?: string;
}

function AddToCartButton({ product, disabled, className }: AddToCartQuantityProps) {
    const { addItem } = useCartStore();

    return (
        <Button disabled={disabled} className={`${className}`} onClick={() => addItem(product)}>
            কার্টে নিন
        </Button>
    )
}

export default AddToCartButton;