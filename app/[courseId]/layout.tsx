import HustLogo from "../components/HustLogo";
import Sidebar from "./components/Sidebar";
import { CourseHeader } from "./components/Header";

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  // Backend removed - no course fetching
  const { courseId } = await params;

  return (
    <div className="h-full">
      {/* Sidebar */}
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <div className="h-full border-r flex flex-col bg-white">
          <div className="h-[70px] border-b flex items-center p-6">
            <HustLogo />
          </div>
          <Sidebar courseId={courseId} chapters={[]} />
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-80 h-full">
        <CourseHeader
          imageUrl="/default-logo.png"
          title="Course Title"
          instructor={{ name: "Unknown Instructor", imageUrl: "/avatar.png" }}
          price={0}
          courseId={courseId}
        />
        <div className="pt-[70px]">{children}</div>
      </div>
    </div>
  );
}