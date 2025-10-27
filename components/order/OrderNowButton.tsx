"use client"

import { Product } from '@/sanity.types';
import React from 'react'
import { Button } from '../ui/button';
import useCartStore from '@/store/cart-store';
import { useRouter } from 'next/navigation';


interface OrderNowButtonProps {
    product: Product;
    disabled?: boolean;
    className?: string;
}

function OrderNowButton({ product, disabled, className }: OrderNowButtonProps) {
    const router = useRouter();
    const { addItem, getItemCount } = useCartStore();
    const itemCount = getItemCount(product._id);

    const handleOrderNow = () => {
        if(itemCount === 0) addItem(product);
        router.push("/cart");
    };

    return (
        <a href="/cart" onClick={handleOrderNow}>
            <Button
                disabled={disabled}
                className={`hithere ${className ?? ""}`}
                aria-label="ক্যাশ অন ডেলিভারিতে অর্ডার করুন"
            >
                ক্যাশ অন ডেলিভারিতে অর্ডার করুন
            </Button>
        </a>
    )
}

export default OrderNowButton