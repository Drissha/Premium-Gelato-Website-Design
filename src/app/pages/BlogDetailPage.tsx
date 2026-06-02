import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock3, Loader2, User, Tag } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getBlogById, unwrapItem } from "../lib/api";
import { normalizeBlog, type NormalizedBlog } from "../lib/normalize";

function BlogDetailLoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="overflow-hidden rounded-[2.5rem] bg-white/90 shadow-2xl shadow-blue-100/60"
    >
      <div className="relative h-[320px] w-full overflow-hidden bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 sm:h-[380px]">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        />
      </div>

      <div className="space-y-5 p-8 lg:p-10">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-reguler/20 to-blue-reguler/20">
            <Loader2 size={20} className="animate-spin text-blue-reguler" />
          </span>
          <div>
            <div className="h-5 w-40 rounded-full bg-gray-200" />
            <div className="mt-2 h-4 w-64 rounded-full bg-gray-100" />
          </div>
        </div>

        <div className="h-12 w-full max-w-3xl rounded-full bg-gray-200" />

        <div className="flex flex-wrap gap-2">
          <div className="h-9 w-24 rounded-full bg-pink-reguler/15" />
          <div className="h-9 w-20 rounded-full bg-pink-reguler/15" />
          <div className="h-9 w-28 rounded-full bg-pink-reguler/15" />
        </div>

        <div className="space-y-3 border-t border-gray-100 pt-6">
          <div className="h-4 w-full rounded-full bg-gray-100" />
          <div className="h-4 w-11/12 rounded-full bg-gray-100" />
          <div className="h-4 w-10/12 rounded-full bg-gray-100" />
          <div className="h-4 w-9/12 rounded-full bg-gray-100" />
          <div className="h-4 w-8/12 rounded-full bg-gray-100" />
        </div>
      </div>
    </motion.div>
  );
}

export function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<NormalizedBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadBlog = async () => {
      if (!id) {
        setError("Blog article not found.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await getBlogById(id);
        const article = unwrapItem(response);

        if (!article) {
          throw new Error("Blog article not found.");
        }

        if (isActive) {
          setBlog(normalizeBlog(article));
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load this article.");
          setBlog(null);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadBlog();

    return () => {
      isActive = false;
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-reguler/10 via-white to-blue-reguler/10 pt-24 pb-20 text-gray-800">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 lg:px-8">
        <Link
          to="/blogs"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-gray-700 shadow-lg shadow-blue-100/60 transition hover:-translate-y-0.5 hover:bg-white"
        >
          <ArrowLeft size={16} /> Back to blog
        </Link>

        {loading && (
          <BlogDetailLoadingState />
        )}

        {error && (
          <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 text-amber-800">
            {error}
          </div>
        )}

        {blog && !loading && (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="overflow-hidden rounded-[2.5rem] bg-white/90 shadow-2xl shadow-blue-100/60"
          >
            <ImageWithFallback
              src={blog.image}
              alt={blog.title}
              className="h-[380px] w-full object-cover"
            />
            <div className="space-y-6 p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {blog.date && (
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={15} /> {blog.date}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <Clock3 size={15} /> {blog.readingTime}
                </span>
                <span className="inline-flex items-center gap-1">
                  <User size={15} /> {blog.author}
                </span>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-gray-800 lg:text-5xl">
                {blog.title}
              </h1>

              <p className="max-w-3xl text-lg leading-relaxed text-gray-600">{blog.excerpt}</p>

              {blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 rounded-full bg-pink-reguler/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-reguler"
                    >
                      <Tag size={12} /> {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="space-y-4 border-t border-gray-100 pt-6 text-gray-700">
                {blog.content
                  .split(/\n{2,}/)
                  .map((paragraph) => paragraph.trim())
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p key={index} className="text-base leading-8">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </motion.article>
        )}
      </div>
    </div>
  );
}
