import Link from "next/link"
import Image from "next/image"
import { CalendarDays, ArrowRight } from "lucide-react"

// Dummy data for news articles
const newsData = [
  {
    id: 1,
    title: "Improving, Not Abandoning, Residential Orphan Care",
    date: "July 25, 2024",
    excerpt:
      "Discover how our approach to residential orphan care is evolving to provide even better support and integration for children in Cambodia.",
    image: "/sponsor4.jpg",
    category: "Orphan Care",
  },
  {
    id: 2,
    title: "Celebrating Milestones: Our Latest University Graduates",
    date: "August 10, 2024",
    excerpt:
      "Join us in celebrating the incredible achievements of our students who have successfully completed their university degrees.",
    image: "/sponsor3.jpg",
    category: "Education",
  },
  {
    id: 3,
    title: "Kid's Camp 2023: A Journey of Faith and Friendship",
    date: "September 01, 2024",
    excerpt:
      "Relive the joyful moments from our recent Kid's Camp, where over 800 children experienced faith, fun, and fellowship.",
    image: "/Camp.jpg",
    category: "Events",
  },
  {
    id: 4,
    title: "Community Outreach: Bringing Hope to Remote Villages",
    date: "October 15, 2024",
    excerpt:
      "Learn about our latest outreach initiatives, providing essential resources and spiritual support to underserved communities.",
    image: "/memories.jpg",
    category: "Community",
  },
]

export default function LatestNews() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#43A047] mb-4">Latest News & Updates</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Stay informed about our impactful work and the lives being transformed in Cambodia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsData.slice(0, 3).map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={article.image || "/Camp.jpg"}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute top-4 left-4 bg-[#43A047] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {article.category}
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 flex items-center mb-3">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  {article.date}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-[#43A047] transition-colors duration-200">
                  <Link href={`/news/${article.id}`}>{article.title}</Link>
                </h3>
                <p className="text-gray-700 text-base mb-4 line-clamp-3">{article.excerpt}</p>
                <Link
                  href={`/news/${article.id}`}
                  className="inline-flex items-center text-[#43A047] font-semibold hover:underline transition-colors duration-200"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/news"
            className="inline-flex items-center px-8 py-4 bg-[#43A047] text-white font-semibold rounded-full hover:bg-[#388E3C] transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            View All News
            <ArrowRight className="w-5 h-5 ml-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}
