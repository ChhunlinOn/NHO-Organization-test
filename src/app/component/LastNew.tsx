import Link from "next/link";
import Image from "next/image";

export default function LastNew() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#43A047] text-center mb-12">
          Latest News
        </h2>

        <div className="flex flex-wrap justify-between gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-white rounded-lg overflow-hidden shadow-md w-[350px]"
            >
              <div className="relative group">
                <Image
                  src="/nho.jpg"
                  alt={`News ${n}`}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover z-10"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition duration-300"></div>
              </div>

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
