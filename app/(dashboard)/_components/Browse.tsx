"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Card from "@/app/components/Card";
import clsx from "clsx";

// Local type definitions since backend was removed
interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: {
    name: string;
    imageUrl: string;
  };
  instructorId: string;
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  price: number;
  category: string;
  level: string;
  duration: string;
  chaptersCount: number;
}

interface Category {
  id: string;
  name: string;
}

export default function Browse() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [courses, setCourses] = useState<CourseCardProps[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        // Backend removed - use empty data
        setCategories([]);
        setActiveCategories([]);
        setCourses([]);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    loadData();
  }, []);

  const toggleCategory = (categoryName: string) => {
    setActiveCategories(prev => {
      if (prev.includes(categoryName)) {
        return prev.filter(cat => cat !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };

  // Filter courses based on active categories
  const filteredCourses = courses.filter(course =>
    activeCategories.length === 0 || activeCategories.includes(course.category)
  );

  return (
    <div className="flex flex-col h-full">
      {/* Category Tabs Section */}
      <div className="flex flex-wrap gap-4 p-3 border-gray-200 bg-white">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => toggleCategory(category.name)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm transition-colors",
              activeCategories.includes(category.name)
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Main Content Section */}
      <main className="flex-1">
        <div className="flex p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                id={course.id}
                instructor={course.instructor}
                instructorId={course.instructorId}
                imageUrl={course.imageUrl}
                title={course.title}
                category={course.category}
                chaptersCount={course.chaptersCount}
                price={course.price}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}