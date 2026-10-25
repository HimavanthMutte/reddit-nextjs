import TopicCreateForm from "@/components/topics/TopicCreateForm";

export default async function Home() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4">
      <div className="min-w-0 bg-gray-100 md:col-span-3">
        <h1>Top Posts</h1>
      </div>

      <div className="min-w-0 bg-gray-100 md:col-span-1">
        <TopicCreateForm />
      </div>
    </div>
  );
}
