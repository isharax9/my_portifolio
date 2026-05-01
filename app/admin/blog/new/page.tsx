import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
        New Blog Post
      </h1>
      <BlogForm />
    </div>
  );
}
