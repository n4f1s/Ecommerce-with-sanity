'use client';

import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <html>
            <body>
                <h1>Something went wrong!</h1>
                <p>{error.message}</p>
                <Button onClick={() => reset()}>Try again</Button>
            </body>
        </html>
    );
}