"use client"

import CourseTable from "./_components/coursesTable"
import { useUserStore } from "@/app/stores/useUserStore"
import { useEffect, useState } from "react"

// Local type definition since backend was removed
interface CourseTableData {
  id: string;
  title: string;
  price: number;
  status: string;
  enrolled: number;
  rating: number;
  createdAt: string;
}

export default function TableCoursePage() {
    const [courses, setCourses] = useState<CourseTableData[]>([])

    const user = useUserStore((state) => state.user)

    useEffect(() => {
        const fetchCourses = async () => {
            if (user?.id) {
                // Backend removed - return empty courses list
                setCourses([]);
            }
        }
        fetchCourses()
    }, [user?.id])

    return (
        <CourseTable fetchData={courses} />
    )
}
