"use client"

import { Product } from '@/sanity.types';
import useBasketStore from '@/store/cart-store';
import { Button } from '../ui/button';



interface AddToBasketQuantityProps {
    product: Product;
    disabled?: boolean;
    className?: string;
}

function AddToBasketButton({ product, disabled, className }: AddToBasketQuantityProps) {
    const { addItem } = useBasketStore();

    return (
        <Button disabled={disabled} className={`${className}`} onClick={() => addItem(product)}>
            কার্টে নিন
        </Button>
    )
}

export default AddToBasketButton