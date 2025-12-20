import { useState } from 'react';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';
import type { ResumeData } from './types';
import { PenTool, Eye, Download } from 'lucide-react';

const initialData: ResumeData = {
  profile: {
    name: '邓文武',
    title: '大数据开发工程师',
    phone: '17859735572',
    email: 'dengwwa@163.com',
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
  ]
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col h-screen print:block">
       <header className="app-header bg-white shadow-sm border-b px-6 py-3 flex justify-between items-center print:hidden z-20 shrink-0">
           <h1 className="text-xl font-bold text-gray-800">简历生成器</h1>
           <div className="flex gap-3">
               <button 
                   onClick={() => setIsPreview(!isPreview)}
                   className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-gray-600 hover:bg-gray-100 border border-gray-200"
               >
                   {isPreview ? <><PenTool size={18} /> 编辑</> : <><Eye size={18} /> 预览</>}
               </button>
               <button 
                   onClick={() => window.print()}
                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
               >
                   <Download size={18} /> 保存 PDF
               </button>
           </div>
       </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        {!isPreview && (
          <div className="w-full md:w-1/2 p-6 bg-white shadow-lg overflow-y-auto print:hidden">
            <ResumeEditor data={resumeData} onChange={setResumeData} />
          </div>
        )}

        {/* Preview Panel */}
        <div id="resume-preview-wrapper" className={`
            p-8 bg-gray-200 overflow-y-auto flex justify-center items-start print:w-full print:h-auto print:p-0 print:bg-white print:overflow-visible print:block print:static
            ${isPreview ? 'w-full' : 'w-full md:w-1/2'}
        `}>
          <ResumePreview data={resumeData} />
        </div>
      </div>
    </div>
  );
}

export default App;
