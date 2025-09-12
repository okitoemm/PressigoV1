
import { blogPosts, BlogPost } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: `${post.title} | Blog LAVOO Express`,
    description: post.description,
    keywords: post.keywords.join(", "),
  };
}


export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/blog" className="flex items-center text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au blog
            </Link>
          </Button>

          <article>
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    {post.keywords.map(keyword => (
                        <Badge key={keyword} variant="secondary">{keyword}</Badge>
                    ))}
                </div>
                <h1 className="text-3xl md:text-5xl font-headline font-bold text-foreground leading-tight">
                {post.title}
                </h1>
                <p className="text-lg text-muted-foreground">{post.date}</p>
            </div>
            
            <div className="my-8 rounded-lg overflow-hidden">
                <Image
                    src={post.imageUrl}
                    alt={post.imageAlt}
                    width={1200}
                    height={630}
                    className="w-full object-cover"
                    priority
                />
            </div>

            <div
              className="prose prose-lg max-w-none prose-headings:font-headline prose-headings:text-foreground prose-a:text-primary hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <div className="mt-12 text-center bg-secondary/50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold font-headline">Prêt à vous simplifier la vie ?</h3>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">Confiez-nous votre linge et retrouvez du temps pour ce qui compte vraiment. Qualité professionnelle, service rapide.</p>
            <Button asChild size="lg" className="mt-6">
                <Link href="/order">Commander maintenant</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

