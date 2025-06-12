import Link from 'next/link';

export default function NotFound() {
  return (
    <>

      <div className="container w-full flex flex-col items-center justify-center min-h-screen text-center p-8">
          <img src="/assets/images/cuate.png" alt="404 Not Found" className="mb-6 w-1/2 max-w-md" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
              className="flex h-10 w-32 items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white"
      >
        Go to Home
      </Link>
      </div>

    </>
  );
}
