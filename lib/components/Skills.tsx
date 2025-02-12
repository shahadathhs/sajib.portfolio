import {
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiRemix,
  SiReactrouter,
  // SiGithub,
  SiJest,
} from "react-icons/si";
import { FaGit } from "react-icons/fa";
import { v4 as uuid } from "uuid";

const skills = [
  { name: "Tailwind CSS", icon: <SiTailwindcss size={48} color="#38B2AC" /> },
  { name: "JavaScript", icon: <SiJavascript size={48} color="#F7DF1E" /> },
  { name: "TypeScript", icon: <SiTypescript size={48} color="#3178C6" /> },
  { name: "React", icon: <SiReact size={48} color="#61DBFB" /> },
  { name: 'React Router', icon: <SiReactrouter size={48} color="#000000" /> },
  { name: "Remix", icon: <SiRemix size={48} color="#000000" /> },
  { name: "Next.js", icon: <SiNextdotjs size={48} color="#000000" /> },
  { name: "Node.js", icon: <SiNodedotjs size={48} color="#68A063" /> },
  { name: "Express.js", icon: <SiExpress size={48} color="#000000" /> },
  { name: "MongoDB", icon: <SiMongodb size={48} color="#4DB33D" /> },
  { name: 'Git', icon: <FaGit size={48} color="#F05032" />},
  { name: 'Jest', icon: <SiJest size={48} color="#000000" /> },
  // { name: 'GitHub', icon: <SiGithub size={48} color="#000000" /> },
];

export default function Skills() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <div
              key={uuid()}
              className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
            >
              {skill.icon}
              <p className="mt-2 text-lg font-medium">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
