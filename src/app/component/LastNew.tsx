import Link from "next/link";
import Image from "next/image";

export default function LastNew() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-green-600 text-center mb-12">Latest News</h2>

    <div className="flex flex-wrap justify-center gap-8">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="bg-white rounded-lg overflow-hidden shadow-md w-[300px]"
        >
          <Image
            src="/NewImg.jpg"
            alt={`News ${n}`}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-center mb-2 text-black">
              Improving, Not abandoning, Residential orphan care
            </h3>
            <Link
              href={`/news/${n}`}
              className="text-green-600 hover:underline block text-center"
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
}
