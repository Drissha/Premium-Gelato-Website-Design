import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Clock3, Search, Sparkles, Tag } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getBlogs, unwrapList } from "../lib/api";
import { normalizeBlog, type NormalizedBlog } from "../lib/normalize";
import { ApiLoadingState } from "../components/ApiLoadingState";

export function BlogsPage() {
  const [blogs, setBlogs] = useState<NormalizedBlog[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadBlogs = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getBlogs();
        const items = unwrapList(response).map((blog, index) => normalizeBlog(blog, index));

        if (isActive) {
          setBlogs(items);
          if (items.length === 0) {
            setError("No articles found.");
          }
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load blog posts.");
          setBlogs([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadBlogs();

    return () => {
      isActive = false;
    };
  }, []);

  const filteredBlogs = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return blogs;
    }

    return blogs.filter((blog) => {
      const haystack = [blog.title, blog.excerpt, blog.author, blog.tags.join(" ")].join(" ").toLowerCase();
      return haystack.includes(keyword);
    });
  }, [blogs, search]);

  const featuredBlog = filteredBlogs[0] ?? blogs[0] ?? null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-reguler/10 via-white to-blue-reguler/10 pt-24 pb-20 text-gray-800">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.5rem] bg-white/85 p-8 shadow-2xl shadow-blue-100/60 lg:p-12"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(224,242,254,0.72),rgba(252,231,243,0.78))]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold shadow-md shadow-blue-100/70">
                <Sparkles size={16} className="text-pink-300" /> Blog
              </span>
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-gray-800 lg:text-6xl">
                Stories, tips, and flavor inspiration from the gelato kitchen.
              </h1>
              <p className="max-w-2xl text-lg text-gray-600 lg:text-xl">
                Explore launches, behind-the-scenes notes, and dessert ideas that pair perfectly with your next visit.
              </p>
              <div className="relative max-w-xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles"
                  className="w-full rounded-full border border-pink-reguler/20 bg-white/90 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-reguler/40 focus:ring-2 focus:ring-blue-reguler/20"
                />
              </div>
            </div>

            {featuredBlog ? (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-xl shadow-blue-100/60"
              >
                <ImageWithFallback
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="h-[320px] w-full object-cover"
                />
                <div className="space-y-4 p-6">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-reguler">
                    <Tag size={14} /> Featured Story
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{featuredBlog.title}</h2>
                  <p className="text-sm leading-relaxed text-gray-600">{featuredBlog.excerpt}</p>
                  <Link
                    to={`/blogs/${featuredBlog.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-reguler via-blue-300 to-blue-200 px-5 py-3 text-sm font-semibold text-gray-700 shadow-lg shadow-blue-100/70"
                  >
                    Read article <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="flex min-h-[320px] items-center justify-center rounded-[2rem] border border-dashed border-blue-200 bg-white/70 p-8 text-center text-gray-600">
                <div>
                  <p className="text-lg font-semibold text-gray-800">No featured article yet</p>
                  <p className="mt-2 text-sm">The API returned no blog items.</p>
                </div>
              </div>
            )}
          </div>
        </motion.section>

        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mb-8">
            <div className="w-full max-w-7xl">
              <ApiLoadingState
                title="Loading blogs"
                message="Fetching the latest stories and articles..."
                cards={3}
                lines={1}
              />
            </div>
          </div>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-[2rem] bg-white/85 shadow-2xl shadow-blue-100/60"
              >
                <ImageWithFallback
                  src={blog.image}
                  alt={blog.title}
                  className="h-56 w-full object-cover"
                />
                <div className="space-y-4 p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    {blog.date && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={14} /> {blog.date}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Clock3 size={14} /> {blog.readingTime}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{blog.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{blog.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-pink-reguler/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-reguler"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-200 via-pink-reguler to-rose-200 px-5 py-3 text-sm font-semibold text-gray-700 shadow-lg shadow-pink-100/70"
                  >
                    Read more <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </section>
        )}

        {!loading && filteredBlogs.length === 0 && (
          <div className="rounded-[2rem] bg-white/85 p-10 text-center shadow-2xl shadow-blue-100/60">
            <h2 className="text-2xl font-bold text-gray-800">No articles found</h2>
            <p className="mt-2 text-gray-600">Try a different keyword or clear your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
