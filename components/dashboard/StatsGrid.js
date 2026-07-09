import StatCard from "./StatCard";

export default function StatsGrid() {

  const stats = [
    {
      type: "total",
      title: "Total Notices",
      value: 24,
      subtitle: "Published notices",
    },
    {
      type: "urgent",
      title: "Urgent",
      value: 3,
      subtitle: "Need attention",
    },
    {
      type: "exams",
      title: "Exam Notices",
      value: 10,
      subtitle: "Upcoming exams",
    },
    {
      type: "events",
      title: "Events",
      value: 11,
      subtitle: "School events",
    },
  ];

  return (
    <section className="mt-8">

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => (
          <StatCard
            key={item.type}
            {...item}
          />
        ))}

      </div>

    </section>
  );
}