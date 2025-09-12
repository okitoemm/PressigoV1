
import { blogPosts } from "@/lib/blog-data";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
  return (
    <div className="bg-secondary/30 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Le Blog LAVOO Express</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Conseils de pro, astuces d'entretien et actualités pour prendre soin de votre linge et vous simplifier la vie.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="overflow-hidden">
                    <Image
                        src={post.imageUrl}
                        alt={post.imageAlt}
                        width={600}
                        height={315}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{post.description}</CardDescription>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.keywords.slice(0, 3).map(keyword => (
                        <Badge key={keyword} variant="secondary">{keyword}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
