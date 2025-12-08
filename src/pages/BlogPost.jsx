import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleBySlug } from '../lib/cms';
import { ArrowLeft } from 'lucide-react';

export default function BlogPost() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getArticleBySlug(slug).then(data => {
            setPost(data);
            setLoading(false);
        });
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <p className="text-xl text-muted">Article not found.</p>
                <Link to="/blog" className="text-accent hover:underline">← Back to Blog</Link>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto py-20 px-4">
            <Link to="/blog" className="inline-flex items-center text-muted hover:text-white mb-8 transition-colors gap-2">
                <ArrowLeft size={20} />
                Back to Blog
            </Link>

            {post.image_url && (
                <div className="rounded-2xl overflow-hidden mb-8 aspect-video">
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                </div>
            )}

            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">{post.title}</h1>
                <time className="text-muted block">{new Date(post.created_at).toLocaleDateString()}</time>
            </div>

            <div className="prose dark:prose-invert prose-lg md:prose-xl mx-auto prose-headings:font-heading prose-a:text-accent hover:prose-a:text-primary dark:hover:prose-a:text-white prose-img:rounded-xl leading-relaxed text-gray-800 dark:text-gray-200">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </article>
    );
}
