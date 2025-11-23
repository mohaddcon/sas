// app/blog/[slug]/page.tsx

// Generates static HTML pages for each slug at build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// The Page component receives the params as props
export default function Page({ params }) {
  // params.slug will be 'post-1', 'post-2', etc., during the build
  return <h1>Welcome to post: {params.slug}</h1>;
}
