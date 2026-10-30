import PostCreateForm from "@/components/posts/PostCreateForm";
import PostList from "@/components/posts/postList";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";
interface TopicShowPage {
  params: {
    slug: string;
  };
}

export default async function TopicsShowPage(props: TopicShowPage) {
  const { slug } = await props.params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
