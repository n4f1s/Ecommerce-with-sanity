import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function NotFound() {

  return (
    <section className="flex items-center justify-center min-h-[100vh] bg-gradient-to-b from-gray-50 to-white text-gray-800 px-6">
      <div className="text-center max-w-lg mx-auto">
        <h1 className="text-[120px] font-extrabold leading-none text-theme-primary">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-semibold mt-4">
          Oops! Page not found
        </h2>

        <p className="text-gray-600 mt-3 max-w-md mx-auto">
          The page you’re looking for doesn’t exist or has been moved. Don’t
          worry — let’s get you back on track.
        </p>

        <div className="mt-8">
          <Link href="/">
            <Button className="text-xl">
              Go Home
            </Button>
          </Link>
        </div>

        <div className="mt-10">
          <div className="relative mx-auto w-full max-w-[400px] aspect-[4/3]">
            <Image
              src="/notFound.png"
              alt="Page not found illustration"
              fill
              sizes="(max-width: 640px) 90vw, 400px"
              className="opacity-90 object-contain"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}