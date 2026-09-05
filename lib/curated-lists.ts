export const UNIVERSITIES = [
  "King Fahd University of Petroleum and Minerals",
  "King Abdullah University of Science and Technology",
  "King Saud University",
  "King Abdulaziz University",
  "Princess Nourah bint Abdulrahman University",
  "Umm Al-Qura University",
  "Imam Abdulrahman Bin Faisal University",
  "Alfaisal University",
  "Prince Sultan University",
  "Effat University",
  "Other",
] as const;

export const FIELDS = [
  "Computer Science",
  "Software Engineering",
  "Computer Engineering",
  "Data Science",
  "Artificial Intelligence",
  "Information Technology",
  "Cybersecurity",
  "Other",
] as const;

export const SKILLS = [
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Java",
  "C++",
  "SQL",
  "Machine Learning",
  "Data Analysis",
  "UI/UX Design",
  "Backend Development",
  "Frontend Development",
  "Mobile Development",
  "Cloud/DevOps",
  "Git",
  "Docker",
] as const;

export type University = (typeof UNIVERSITIES)[number];
export type Field = (typeof FIELDS)[number];
export type Skill = (typeof SKILLS)[number];
