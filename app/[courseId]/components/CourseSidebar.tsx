import ChapterItem from "./ChapterItem";

// Local type definition since backend was removed
interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  isLocked: boolean;
  position: number;
}

interface CourseWithLessons {
  id: string;
  title: string;
  description: string;
  chapters: Lesson[];
}

interface CourseSidebarProps {
  course: CourseWithLessons;
}

export default function CourseSidebar({ course }: CourseSidebarProps) {
  return (
    <div className="h-full border-r flex flex-col bg-white">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">{course.title}</h2>
      </div>
      <div className="flex flex-col w-full overflow-y-auto">
        {course.chapters.map((chapter) => (
          <ChapterItem 
            key={chapter.id}
            id={chapter.id}
            title={chapter.title}
            isLocked={chapter.isLocked}
            courseId={course.id}
          />
        ))}
      </div>
    </div>
  );
}
