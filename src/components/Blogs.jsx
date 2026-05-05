import { useState, useEffect } from "react";
import { getAllBlogs, getAllTopics } from "../api/blog";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

function BlogCard({ blog }) {
  const [expanded, setExpanded] = useState(false);
  const preview = blog.content?.length > 180
    ? blog.content.slice(0, 180) + "…"
    : blog.content;

  const authorName = blog.User
    ? `${blog.User.firstName ?? ""} ${blog.User.lastName ?? ""}`.trim() || blog.User.email
    : "Serenova Doctor";

  return (
    <article className="blog-card">
      {blog.banner_img && (
        <div className="blog-card-banner">
          <img src={blog.banner_img} alt={blog.title} />
        </div>
      )}
      <div className="blog-card-body">
        {blog.Topic?.topic && (
          <span className="blog-topic-chip">{blog.Topic.topic}</span>
        )}
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-content">
          {expanded ? blog.content : preview}
        </p>
        {blog.content?.length > 180 && (
          <button className="blog-read-toggle" onClick={() => setExpanded(e => !e)}>
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
        <div className="blog-card-footer">
          <div className="blog-author">
            <div className="blog-author-avatar">
              {authorName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="blog-author-name">{authorName}</p>
              {blog.createdAt && (
                <p className="blog-author-date">{timeAgo(blog.createdAt)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Blogs() {
  const [blogs, setBlogs]           = useState([]);
  const [topics, setTopics]         = useState([]);
  const [activeTopic, setActiveTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs  = getAllBlogs().then(r  => setBlogs(r.data.data  ?? [])).catch(() => setBlogs([]));
    const fetchTopics = getAllTopics().then(r => setTopics(r.data.data ?? [])).catch(() => setTopics([]));
    Promise.all([fetchBlogs, fetchTopics]).finally(() => setLoading(false));
  }, []);

  const filtered = activeTopic
    ? blogs.filter(b => b.topic_id === activeTopic)
    : blogs;

  return (
    <section className="blogs-section" id="blogs">
      <div className="blogs-inner">

        {/* Header */}
        <div className="blogs-header">
          <p className="section-label">From Our Doctors</p>
          <h2 className="section-title">Expert <em>insights</em> for your journey</h2>
          <p className="section-sub">
            Evidence-based articles written by perinatal health professionals,
            covering every stage of your motherhood journey.
          </p>
        </div>

        {/* Topic filter chips */}
        {topics.length > 0 && (
          <div className="blog-topic-filters">
            <button
              className={`blog-filter-chip ${!activeTopic ? "active" : ""}`}
              onClick={() => setActiveTopic(null)}
            >
              All
            </button>
            {topics.map(t => (
              <button
                key={t.id}
                className={`blog-filter-chip ${activeTopic === t.id ? "active" : ""}`}
                onClick={() => setActiveTopic(t.id)}
              >
                {t.topic}
              </button>
            ))}
          </div>
        )}

        {/* States */}
        {loading && (
          <div className="blogs-state">
            <span className="btn-spinner" style={{ borderTopColor: "var(--sage)", borderColor: "var(--sage-pale)" }} />
            <p>Loading articles…</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="blogs-state">
            <p className="blogs-empty">
              {activeTopic
                ? "No articles in this topic yet."
                : "No articles published yet. Check back soon."}
            </p>
          </div>
        )}

        {/* Blog grid */}
        {!loading && filtered.length > 0 && (
          <div className="blogs-grid">
            {filtered.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
