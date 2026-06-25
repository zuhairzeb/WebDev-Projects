import { SectionWrapper } from './SectionWrapper';
import { GlassCard } from './GlassEffect';
import { CircleDot, Cpu, Code2, ShieldCheck } from 'lucide-react';

const skillGroups = [
  {
    title: 'WordPress',
    skills: ['WordPress', 'WooCommerce', 'Elementor Pro'],
    icon: Code2,
  },
  {
    title: 'Languages',
    skills: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    icon: Cpu,
  },
  {
    title: 'Tools',
    skills: ['SEO', 'cPanel', 'SSL', 'GitHub', 'Ubuntu', 'Linux'],
    icon: ShieldCheck,
  },
];

export const Skills = () => {
  return (
    <SectionWrapper id="skills" className="bg-white overflow-visible">
      <div className="text-center mb-20">
        <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-xs block mb-6">Skills Snapshot</span>
        <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-tight">
          SKILLS <span className="text-blue-600 italic">FRAMEWORK.</span>
        </h2>
        <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto mt-6">
          Recruiters scan skills first. This section highlights the exact capabilities I bring to WordPress development and web projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <GlassCard key={group.title} className="p-10 border border-gray-100 hover:border-blue-200 transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="rounded-3xl bg-blue-600/10 text-blue-600 p-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-bebas text-3xl tracking-tight">{group.title}</h3>
              </div>
              <ul className="space-y-4">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-gray-600">
                    <CircleDot size={12} className="text-blue-600" />
                    <span className="font-medium">{skill}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          );
        })}
      </div>
    </SectionWrapper>
  );
};