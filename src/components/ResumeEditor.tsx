import type { ResumeData, SkillGroup } from '../types';
import { Plus, Trash2, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import RichTextEditor from './RichTextEditor';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

type ExperienceItem = ResumeData['experience'][number];
type ProjectItem = ResumeData['projects'][number];

// Helper for generating IDs
const generateId = () => Date.now().toString() + Math.random().toString().slice(2);

export default function ResumeEditor({ data, onChange }: Props) {
  const handleChange = <K extends keyof ResumeData>(section: K, value: ResumeData[K]) => {
    onChange({ ...data, [section]: value });
  };

  const handleProfileChange = (field: keyof ResumeData['profile'], value: string) => {
    if (data.profile[field] === value) return;
    onChange({
      ...data,
      profile: { ...data.profile, [field]: value }
    });
  };

  const addSkillGroup = () => {
    const newSkills = [...data.skills, { id: generateId(), name: '新技能分类', content: '' }];
    handleChange('skills', newSkills);
  };

  const updateSkillGroup = (index: number, field: keyof SkillGroup, value: string) => {
    const current = data.skills[index];
    if (!current || current[field] === value) return;
    const newSkills = [...data.skills];
    newSkills[index] = { ...current, [field]: value };
    handleChange('skills', newSkills);
  };

  const deleteSkillGroup = (index: number) => {
    const newSkills = data.skills.filter((_, i) => i !== index);
    handleChange('skills', newSkills);
  };

  const moveSkillGroup = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === data.skills.length - 1)) return;
    const newSkills = [...data.skills];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newSkills[index], newSkills[swapIndex]] = [newSkills[swapIndex], newSkills[index]];
    handleChange('skills', newSkills);
  };

  const addExperience = () => {
    handleChange('experience', [
      { id: generateId(), company: '新公司', title: '职位', date: '2024/01 - 至今', location: '', details: '' },
      ...data.experience
    ]);
  };

  const updateExperience = (index: number, field: keyof ExperienceItem, value: string) => {
    const current = data.experience[index];
    if (!current || current[field] === value) return;
    const newExp = [...data.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    handleChange('experience', newExp);
  };

  const deleteExperience = (index: number) => {
    handleChange('experience', data.experience.filter((_, i) => i !== index));
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
      if ((direction === 'up' && index === 0) || (direction === 'down' && index === data.experience.length - 1)) return;
      const newExp = [...data.experience];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      [newExp[index], newExp[swapIndex]] = [newExp[swapIndex], newExp[index]];
      handleChange('experience', newExp);
  };

  const sortExperience = () => {
     const newExp = [...data.experience].sort((a, b) => {
        const getStart = (d: string) => {
            const match = d.match(/(\d{4})[./-](\d{1,2})/);
            if (match) return parseInt(match[1]) * 100 + parseInt(match[2]);
            return 0;
        };
        return getStart(b.date) - getStart(a.date);
     });
     handleChange('experience', newExp);
  };

  const addProject = () => {
    handleChange('projects', [
      { id: generateId(), name: '新项目', date: '', summary: '', role: '角色', description: '', techStack: '' },
      ...data.projects
    ]);
  };

  const updateProject = (index: number, field: keyof ProjectItem, value: string) => {
    const current = data.projects[index];
    if (!current || current[field] === value) return;
    const newProj = [...data.projects];
    newProj[index] = { ...newProj[index], [field]: value };
    handleChange('projects', newProj);
  };

  const deleteProject = (index: number) => {
    handleChange('projects', data.projects.filter((_, i) => i !== index));
  };
  
  const moveProject = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === data.projects.length - 1)) return;
    const newProj = [...data.projects];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newProj[index], newProj[swapIndex]] = [newProj[swapIndex], newProj[index]];
    handleChange('projects', newProj);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Profile Section */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-600 border-b pb-1">个人信息</h3>
        <div className="space-y-3">
          <input type="text" placeholder="姓名" className="w-full p-2 border rounded" value={data.profile.name} onChange={(e) => handleProfileChange('name', e.target.value)} />
          <input type="text" placeholder="职位" className="w-full p-2 border rounded" value={data.profile.title} onChange={(e) => handleProfileChange('title', e.target.value)} />
          <div className="flex gap-2">
            <input type="text" placeholder="电话" className="flex-1 p-2 border rounded" value={data.profile.phone} onChange={(e) => handleProfileChange('phone', e.target.value)} />
            <input type="text" placeholder="邮箱" className="flex-1 p-2 border rounded" value={data.profile.email} onChange={(e) => handleProfileChange('email', e.target.value)} />
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="地理位置 (如: 厦门)" className="flex-1 p-2 border rounded" value={data.profile.location || ''} onChange={(e) => handleProfileChange('location', e.target.value)} />
            <input type="text" placeholder="生日 (如: 1996/10)" className="flex-1 p-2 border rounded" value={data.profile.birthDate || ''} onChange={(e) => handleProfileChange('birthDate', e.target.value)} />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <div className="flex justify-between items-center mb-3 border-b pb-1">
            <h3 className="text-lg font-semibold text-blue-600">专业技能</h3>
            <button onClick={addSkillGroup} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Plus size={18} /></button>
        </div>
        <div className="space-y-4">
            {data.skills.map((group, index) => (
                <div key={group.id} className="bg-gray-50 p-3 rounded border">
                    <div className="flex items-center gap-2 mb-2">
                        <button onClick={() => moveSkillGroup(index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-blue-600 disabled:opacity-30"><ArrowUp size={16} /></button>
                        <button onClick={() => moveSkillGroup(index, 'down')} disabled={index === data.skills.length - 1} className="text-gray-400 hover:text-blue-600 disabled:opacity-30"><ArrowDown size={16} /></button>
                        <input 
                            className="flex-1 font-bold p-1 border rounded" 
                            value={group.name} 
                            onChange={(e) => updateSkillGroup(index, 'name', e.target.value)}
                            placeholder="技能分类名称"
                        />
                        <button onClick={() => deleteSkillGroup(index)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                    {/* Content Logic */}
                    <div className="mt-2">
                        <RichTextEditor 
                            value={group.content} 
                            onChange={(val) => updateSkillGroup(index, 'content', val)}
                            placeholder="输入技能详情..."
                        />
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <div className="flex justify-between items-center mb-3 border-b pb-1">
            <h3 className="text-lg font-semibold text-blue-600">工作经历</h3>
            <div className="flex gap-2">
                <button onClick={sortExperience} className="text-gray-600 hover:bg-gray-100 p-1 rounded text-sm flex items-center gap-1" title="按时间倒序">
                    <ArrowUpDown size={14} /> 排序
                </button>
                <button onClick={addExperience} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Plus size={18} /></button>
            </div>
        </div>
        <div className="space-y-6">
            {data.experience.map((exp, index) => (
                <div key={exp.id} className="bg-gray-50 p-4 rounded border relative group">
                    <div className="absolute right-2 top-2 flex gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => moveExperience(index, 'up')} disabled={index === 0} className="p-1 hover:text-blue-600 disabled:hidden"><ArrowUp size={16} /></button>
                         <button onClick={() => moveExperience(index, 'down')} disabled={index === data.experience.length - 1} className="p-1 hover:text-blue-600 disabled:hidden"><ArrowDown size={16} /></button>
                         <button onClick={() => deleteExperience(index)} className="p-1 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 mb-3 pr-20">
                        <input className="p-2 border rounded font-bold" value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} placeholder="公司名称" />
                        <div className="flex gap-2">
                            <input className="flex-1 p-2 border rounded" value={exp.title} onChange={(e) => updateExperience(index, 'title', e.target.value)} placeholder="职位" />
                            <input className="w-1/4 p-2 border rounded" value={exp.location || ''} onChange={(e) => updateExperience(index, 'location', e.target.value)} placeholder="地点" />
                            <input className="w-1/3 p-2 border rounded" value={exp.date} onChange={(e) => updateExperience(index, 'date', e.target.value)} placeholder="时间 (YYYY/MM - YYYY/MM)" />
                        </div>
                    </div>
                    
                    <div className="mt-2">
                        <label className="text-xs text-gray-500 mb-1 block">工作详情:</label>
                        <RichTextEditor 
                            value={exp.details} 
                            onChange={(newDetails) => updateExperience(index, 'details', newDetails)} 
                        />
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <div className="flex justify-between items-center mb-3 border-b pb-1">
            <h3 className="text-lg font-semibold text-blue-600">项目经历</h3>
            <div className="flex gap-2">
                <button onClick={addProject} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Plus size={18} /></button>
            </div>
        </div>
        <div className="space-y-6">
             {data.projects.map((proj, index) => (
                <div key={proj.id} className="bg-gray-50 p-4 rounded border relative group">
                    <div className="absolute right-2 top-2 flex gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => moveProject(index, 'up')} disabled={index === 0} className="p-1 hover:text-blue-600 disabled:hidden"><ArrowUp size={16} /></button>
                         <button onClick={() => moveProject(index, 'down')} disabled={index === data.projects.length - 1} className="p-1 hover:text-blue-600 disabled:hidden"><ArrowDown size={16} /></button>
                         <button onClick={() => deleteProject(index)} className="p-1 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 mb-3 pr-20">
                        <div className="flex gap-2">
                            <input className="flex-1 p-2 border rounded font-bold" value={proj.name} onChange={(e) => updateProject(index, 'name', e.target.value)} placeholder="项目名称" />
                            <input className="w-1/3 p-2 border rounded" value={proj.date} onChange={(e) => updateProject(index, 'date', e.target.value)} placeholder="项目时间" />
                        </div>
                        <input className="p-2 border rounded text-sm" value={proj.techStack} onChange={(e) => updateProject(index, 'techStack', e.target.value)} placeholder="技术栈" />
                        <textarea 
                            className="p-2 border rounded text-sm h-20 resize-y" 
                            value={proj.summary} 
                            onChange={(e) => updateProject(index, 'summary', e.target.value)} 
                            placeholder="项目描述 (简短概括)" 
                        />
                    </div>
                    
                    <div className="mt-2">
                        <label className="text-xs text-gray-500 mb-1 block">职责描述:</label>
                        <RichTextEditor
                            value={proj.description}
                            onChange={(val) => updateProject(index, 'description', val)}
                            placeholder="输入职责描述..."
                        />
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Self Evaluation Section */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-600 border-b pb-1">自我评价</h3>
        <RichTextEditor 
          value={data.profile.summary} 
          onChange={(val) => handleProfileChange('summary', val)}
          placeholder="请输入自我评价..."
        />
      </section>
    </div>
  );
}
