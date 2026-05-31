import { useState, useEffect, useRef } from 'react';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';
import type { ResumeData, Theme, FontSize, SectionType } from './types';
import { PenTool, Eye, Download } from 'lucide-react';

const themeConfigs: Record<
  Theme,
  {
    primaryButton: string;
    primaryButtonHover: string;
    themeDot: string;
  }
> = {
  blue: {
    primaryButton: 'bg-blue-600',
    primaryButtonHover: 'hover:bg-blue-700',
    themeDot: 'bg-blue-600',
  },
  green: {
    primaryButton: 'bg-emerald-600',
    primaryButtonHover: 'hover:bg-emerald-700',
    themeDot: 'bg-emerald-600',
  },
  purple: {
    primaryButton: 'bg-purple-600',
    primaryButtonHover: 'hover:bg-purple-700',
    themeDot: 'bg-purple-600',
  },
};

const themeOptions: { id: Theme; label: string }[] = [
  { id: 'blue', label: '蓝' },
  { id: 'green', label: '绿' },
  { id: 'purple', label: '紫' },
];

const fontSizeOptions: { id: FontSize; label: string }[] = [
  { id: 'small', label: '小' },
  { id: 'medium', label: '中' },
  { id: 'large', label: '大' },
];

const STORAGE_KEY = 'resume-web-data-v1';

const initialData: ResumeData = {
  profile: {
    name: 'xxx',
    title: '大数据开发工程师',
    phone: '17859xxx72',
    email: 'xxxx@163.com',
    location: '厦门',
    birthDate: '1996/10',
    summary: '<ul><li>拥有扎实的大数据技术基础，熟悉 Hadoop, Spark, Flink 等主流计算框架。</li><li>具备海量数据处理与数仓建设经验。</li></ul>',
  },
  education: [
    {
      id: '1',
      school: '某某大学',
      degree: '计算机科学与技术 本科',
      date: '201x - 202x',
    }
  ],
  experience: [
    {
      id: '1',
      company: '某科技公司',
      title: '大数据开发工程师',
      date: '2021.07 - 至今',
      location: '厦门',
      details: '<ul><li>负责离线数仓建设与维护。</li><li>参与实时计算平台搭建，降低数据延迟。</li><li>优化 Spark 任务性能，提升计算效率 30%。</li></ul>',
    }
  ],
  skills: [
    {
      id: '1',
      name: '大数据技术栈',
      content: '<ul><li><strong>编程语言:</strong> Java, Scala, Python, SQL</li><li><strong>大数据组件:</strong> Hadoop, Hive, Spark, Flink, Kafka, HBase</li><li><strong>数据库:</strong> MySQL, Redis, ClickHouse</li></ul>'
    },
    {
      id: '2',
      name: '开发工具',
      content: '<ul><li><strong>工具:</strong> Git, Maven, IDEA, Linux</li></ul>'
    }
  ],
  projects: [
    {
      id: '1',
      name: '实时用户行为分析系统',
      date: '2022.01 - 2022.06',
      role: '核心开发',
      summary: '构建基于 Flink 的实时数据处理系统，用于实时监控用户行为并生成报表。',
      description: '<ul><li>设计并实现了基于 Flink 的实时计算任务，处理峰值 QPS 达 5万+。</li><li>使用 Kafka 作为消息队列，实现数据的削峰填谷。</li><li><span class="ql-indent-1">解决了数据倾斜问题，通过自定义分区器优化数据分发。</span></li><li><span class="ql-indent-1">优化状态后端存储，从 MemoryStateBackend 迁移至 RocksDB。</span></li></ul>',
      techStack: 'Flink, Kafka, MySQL, Redis',
    }
  ],
  sectionOrder: ['skills', 'experience', 'projects', 'education', 'summary'],
};

function loadInitialResumeData(): ResumeData {
  if (typeof window === 'undefined') return initialData;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialData;
  try {
    const parsed = JSON.parse(raw) as ResumeData;
    if (!parsed || !parsed.profile || !parsed.experience || !parsed.skills || !parsed.projects || !parsed.education) {
      return initialData;
    }
    return parsed;
  } catch {
    return initialData;
  }
}

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(() => loadInitialResumeData());
  const [isPreview, setIsPreview] = useState(false);
  const [theme, setTheme] = useState<Theme>('blue');
  const themeConfig = themeConfigs[theme];
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch {
      /* ignore */
    }
  }, [resumeData]);

  const handleMoveSection = (section: SectionType, direction: 'up' | 'down') => {
    const DEFAULT_ORDER: SectionType[] = ['skills', 'experience', 'projects', 'education', 'summary'];
    const currentOrder = resumeData.sectionOrder ?? DEFAULT_ORDER;
    const index = currentOrder.indexOf(section);
    if (index === -1) return;
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === currentOrder.length - 1)) return;
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    const newOrder = [...currentOrder];
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    setResumeData({ ...resumeData, sectionOrder: newOrder });
  };

  const handleExportJson = () => {
    if (typeof window === 'undefined') return;
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date();
    const timestamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(
      date.getDate(),
    ).padStart(2, '0')}`;
    link.href = url;
    link.download = `resume-${timestamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleImportJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result;
        if (typeof text !== 'string') return;
        const parsed = JSON.parse(text) as ResumeData;
        if (!parsed || !parsed.profile || !parsed.experience || !parsed.skills || !parsed.projects || !parsed.education) {
          return;
        }
        setResumeData(parsed);
      } catch {
        /* ignore invalid file */
      }
    };
    reader.readAsText(file, 'utf-8');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col h-screen print:block">
       <header className="app-header bg-white shadow-sm border-b px-6 py-3 flex justify-between items-center print:hidden z-20 shrink-0">
           <h1 className="text-xl font-bold text-gray-800">简历生成器</h1>
           <div className="flex items-center gap-6">
             <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                 <span className="text-sm text-gray-500">主题</span>
                 <div className="flex items-center gap-2">
                   {themeOptions.map((item) => {
                     const isActive = item.id === theme;
                     const dotClass = themeConfigs[item.id].themeDot;
                     return (
                       <button
                         key={item.id}
                         type="button"
                         onClick={() => setTheme(item.id)}
                         className={`w-5 h-5 rounded-full border border-gray-300 ${dotClass} ${isActive ? 'ring-2 ring-offset-1 ring-gray-700' : ''}`}
                         aria-label={`切换主题为${item.label}`}
                       />
                     );
                   })}
                 </div>
               </div>
               <div className="flex items-center gap-2">
                 <span className="text-sm text-gray-500">字号</span>
                 <div className="inline-flex rounded-md border border-gray-200 bg-gray-50">
                   {fontSizeOptions.map((item) => {
                     const isActive = item.id === fontSize;
                     return (
                       <button
                         key={item.id}
                         type="button"
                         onClick={() => setFontSize(item.id)}
                         className={`px-2 py-1 text-xs border-l border-gray-200 first:border-l-0 ${
                           isActive ? 'bg-white text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-800'
                         }`}
                       >
                         {item.label}
                       </button>
                     );
                   })}
                 </div>
               </div>
             </div>
             <div className="flex gap-3 items-center">
               <div className="flex gap-2">
                 <button
                   type="button"
                   onClick={handleExportJson}
                   className="px-3 py-1.5 text-xs border border-gray-200 rounded-md text-gray-600 hover:bg-gray-100"
                 >
                   导出 JSON
                 </button>
                 <button
                   type="button"
                   onClick={handleImportClick}
                   className="px-3 py-1.5 text-xs border border-gray-200 rounded-md text-gray-600 hover:bg-gray-100"
                 >
                   导入 JSON
                 </button>
                 <input
                   ref={fileInputRef}
                   type="file"
                   accept="application/json,.json"
                   className="hidden"
                   onChange={handleImportJson}
                 />
               </div>
              <button 
                   onClick={() => setIsPreview(!isPreview)}
                   className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-gray-600 hover:bg-gray-100 border border-gray-200"
               >
                   {isPreview ? <><PenTool size={18} /> 编辑</> : <><Eye size={18} /> 预览</>}
               </button>
               <button 
                   onClick={() => window.print()}
                   className={`flex items-center gap-2 px-4 py-2 text-white rounded-md transition-colors shadow-sm ${themeConfig.primaryButton} ${themeConfig.primaryButtonHover}`}
               >
                   <Download size={18} /> 保存 PDF
               </button>
             </div>
           </div>
       </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        {!isPreview && (
          <div className="w-full md:w-1/2 p-6 bg-white shadow-lg overflow-y-auto print:hidden">
            <ResumeEditor data={resumeData} onChange={setResumeData} onSectionMove={handleMoveSection} />
          </div>
        )}

        {/* Preview Panel */}
        <div id="resume-preview-wrapper" className={`
            p-8 bg-gray-200 overflow-y-auto flex justify-center items-start print:w-full print:h-auto print:p-0 print:bg-white print:overflow-visible print:block print:static
            ${isPreview ? 'w-full' : 'w-full md:w-1/2'}
        `}>
          <ResumePreview data={resumeData} theme={theme} fontSize={fontSize} sectionOrder={resumeData.sectionOrder} />
        </div>
      </div>
    </div>
  );
}

export default App;
