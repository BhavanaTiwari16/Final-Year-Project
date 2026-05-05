import { useState, useEffect } from "react";
import {
  getAllTopics, getBlogsByAuthor,
  createBlog, submitBlog, deleteBlog
} from "../api/blog";

const STATUS_META = {
  DRAFT:       { label: "Draft",       color: "#7a6e67", bg: "#f0ece8" },
  UNPUBLISHED: { label: "Under Review", color: "#b07d2e", bg: "#fdf3e3" },
  PUBLISHED:   { label: "Published",   color: "#2e6b47", bg: "#e8f0eb" },
};

function authConfig() {
  return { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } };
}

function BlogRow({ blog, onSubmit, onDelete }) {
  const meta = STATUS_META[blog.status] || STATUS_META.DRAFT;
  return (
    <div className="doctor-blog-row">
      <div className="doctor-blog-row-main">
        <span className="doctor-status-badge" style={{ color: meta.color, background: meta.bg }}>
          {meta.label}
        </span>
        <p className="doctor-blog-row-title">{blog.title}</p>
        <p className="doctor-blog-row-date">
          {new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </p>
      </div>
      <div className="doctor-blog-row-actions">
        {blog.status === "DRAFT" && (
          <button className="doctor-btn doctor-btn--submit" onClick={() => onSubmit(blog.id)}>
            Submit for review
          </button>
        )}
        <button className="doctor-btn doctor-btn--delete" onClick={() => onDelete(blog.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default function DoctorPanel({ user }) {
  const [topics, setTopics]       = useState([]);
  const [myBlogs, setMyBlogs]     = useState([]);
  const [showForm, setShowForm]   = useState(false);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [feedback, setFeedback]   = useState({ type: "", msg: "" });

  const [form, setForm] = useState({ title: "", topic_id: "", content: "" });

  useEffect(() => {
    Promise.all([
      getAllTopics().then(r => setTopics(r.data.data ?? [])).catch(() => {}),
      getBlogsByAuthor(user.id).then(r => setMyBlogs(r.data.data ?? [])).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, [user.id]);

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleCreate = async () => {
    if (!form.title.trim() || !form.topic_id || !form.content.trim()) {
      setFeedback({ type: "error", msg: "Please fill in title, topic and content." });
      return;
    }
    setSaving(true);
    setFeedback({ type: "", msg: "" });
    try {
      const res = await createBlog(
        { title: form.title, topic_id: Number(form.topic_id), content: form.content },
        authConfig()
      );
      setMyBlogs(prev => [res.data.data, ...prev]);
      setForm({ title: "", topic_id: "", content: "" });
      setShowForm(false);
      setFeedback({ type: "success", msg: "Draft saved successfully." });
    } catch (err) {
      setFeedback({ type: "error", msg: err?.response?.data?.message || "Failed to save draft." });
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (id) => {
    try {
      await submitBlog(id, authConfig());
      setMyBlogs(prev => prev.map(b => b.id === id ? { ...b, status: "UNPUBLISHED" } : b));
      setFeedback({ type: "success", msg: "Blog submitted for admin review." });
    } catch (err) {
      setFeedback({ type: "error", msg: err?.response?.data?.message || "Failed to submit blog." });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog permanently?")) return;
    try {
      await deleteBlog(id, authConfig());
      setMyBlogs(prev => prev.filter(b => b.id !== id));
      setFeedback({ type: "success", msg: "Blog deleted." });
    } catch (err) {
      setFeedback({ type: "error", msg: err?.response?.data?.message || "Failed to delete blog." });
    }
  };

  return (
    <div className="doctor-panel">
      <div className="doctor-panel-header">
        <div>
          <p className="dash-card-label">Doctor Portal</p>
          <h3 className="doctor-panel-title">Your Articles</h3>
        </div>
        <button
          className="doctor-write-btn"
          onClick={() => { setShowForm(f => !f); setFeedback({ type: "", msg: "" }); }}
        >
          {showForm ? "✕ Cancel" : "+ Write New Article"}
        </button>
      </div>

      {/* Feedback */}
      {feedback.msg && (
        <div className={`auth-alert ${feedback.type === "error" ? "auth-alert--error" : "auth-alert--success"}`}>
          {feedback.msg}
        </div>
      )}

      {/* New blog form */}
      {showForm && (
        <div className="doctor-form">
          <div className="form-group">
            <label>Article title</label>
            <input
              placeholder="e.g. Managing anxiety in the first trimester"
              value={form.title}
              onChange={e => setField("title", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Topic</label>
            <select value={form.topic_id} onChange={e => setField("topic_id", e.target.value)}>
              <option value="">Select a topic</option>
              {topics.map(t => (
                <option key={t.id} value={t.id}>{t.topic}</option>
              ))}
            </select>
            {topics.length === 0 && (
              <p className="form-note">No topics yet. Ask an admin to create topics first.</p>
            )}
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              className="doctor-textarea"
              placeholder="Write your article here…"
              rows={10}
              value={form.content}
              onChange={e => setField("content", e.target.value)}
            />
          </div>

          <div className="doctor-form-footer">
            <p className="form-note">Saved as a draft — submit for admin review when ready to publish.</p>
            <button className="btn-submit" style={{ width: "auto", padding: "12px 32px" }} onClick={handleCreate} disabled={saving}>
              {saving ? <span className="btn-spinner" /> : "Save Draft"}
            </button>
          </div>
        </div>
      )}

      {/* Blog list */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <span className="btn-spinner" style={{ borderTopColor: "var(--sage)", borderColor: "var(--sage-pale)", width: 24, height: 24, borderWidth: 3 }} />
        </div>
      ) : myBlogs.length === 0 ? (
        <p className="blogs-empty" style={{ padding: "32px 0" }}>No articles yet. Write your first one above.</p>
      ) : (
        <div className="doctor-blog-list">
          {myBlogs.map(blog => (
            <BlogRow key={blog.id} blog={blog} onSubmit={handleSubmit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
