import { useEffect, useState } from 'react';
import { getArticles } from '../lib/cms';
import { Link } from 'react-router-dom';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getArticles().then(data => {
            setPosts(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="py-20">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-12 text-center">Blog</h1>
            {posts.length === 0 ? (
                <p className="text-center text-muted">No articles found.</p>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map(post => (
                        <article key={post.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 group">
                            {post.image_url && (
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={post.image_url}
                                        alt={post.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="text-sm text-muted mb-2">
                                    {new Date(post.created_at).toLocaleDateString()}
                                </div>
                                <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-muted text-sm mb-4 line-clamp-3">
                                    {post.summary || "Click to read more..."}
                                </p>
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="inline-flex items-center text-sm font-medium hover:text-accent transition-colors"
                                >
                                    Read Article →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
