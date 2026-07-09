import NoticeCard from "./NoticeCard";

const notices = [
  {
    id: 1,
    title: "Updated Examination Schedule",
    body: "Mid-term examinations are postponed to next Monday due to heavy rainfall.",
    category: "Exam",
    priority: "Urgent",
    publishDate: "2026-07-10",
  },
  {
    id: 2,
    title: "Annual Sports Meet",
    body: "The annual sports meet will be conducted on July 18.",
    category: "Event",
    priority: "Normal",
    publishDate: "2026-07-12",
  },
];

export default function NoticeGrid() {
  return (
    <section className="mt-8">

      <div className="space-y-6">

        {notices.map((notice) => (
          <NoticeCard
            key={notice.id}
            notice={notice}
          />
        ))}

      </div>

    </section>
  );
}