import Link from "next/link";
import { Chip } from "@heroui/react";
import { db } from "@/db";
import { paths } from "@/path";

export default async function TopicList() {
  const topics = await db.topic.findMany();
  const renderedTopics = topics.map((topic) => {
    return (
      <div key={topic.id}>
        <Link href={paths.getTopicShowPath(topic.slug)}>
          <Chip color="success" variant="soft">
            {topic.slug}
          </Chip>
        </Link>
      </div>
    );
  });
  return <div className="flex gap-2 flex-wrap">{renderedTopics}</div>;
}
