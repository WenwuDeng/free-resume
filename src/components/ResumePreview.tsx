import type { ResumeData } from '../types';
import { MapPin, Mail, Phone, Cake, GraduationCap } from 'lucide-react';

interface Props {
  data: ResumeData;
}

const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center bg-blue-50 mb-4">
    <div className="w-1 h-8 bg-blue-600 mr-3"></div>
    <h2 className="text-lg font-bold text-blue-600 tracking-wide py-1">{title}</h2>
  </div>
);

export default function ResumePreview({ data }: Props) {
  const { location, birthDate } = data.profile;

  return (
    <>
      <style>{`
        @page {
          size: A4;
          margin: 0;
        }
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0;
            padding: 0;
          }
          .print-container {
            box-shadow: none !important;
            min-height: auto !important;
            height: auto !important;
          }
          .page-break-before {
            page-break-before: always;
            break-before: page;
          }
          .page-break-after {
            page-break-after: always;
            break-after: page;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .page-break-inside-auto {
            page-break-inside: auto;
            break-inside: auto;
          }
        }

        .break-after-avoid {
            break-after: avoid;
            page-break-after: avoid;
        }
        .break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
        }
        
        .print-container {
            display: block;
        }
        
        @media screen {
          .print-container {
            background-color: #fff;
            /* Improved visual page break for screen preview */
            background-image: repeating-linear-gradient(
              to bottom,
              transparent 0,
              transparent 296mm,
              #e5e7eb 296mm,
              #e5e7eb 297mm,
              transparent 297mm,
              transparent 100%
            );
            background-size: 100% 297mm;
            position: relative;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
        }
        
        /* Dynamic content adjustment classes */
        .content-section {
          page-break-inside: auto;
          break-inside: auto;
          display: block;
        }
        
        /* 
         * Override break-inside-avoid for content items if they are causing large gaps.
         * We only want to avoid breaking inside very small elements.
         * If a project/job description is long, it should be allowed to break.
         */
        .break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
        }
        
        .compact-section {
          margin-bottom: 12px !important;
        }
        
        .tight-spacing {
          line-height: 1.3 !important;
          
          margin-bottom: 8px !important;
        }
        
        .print-optimized {
          font-size: 12px !important;
          line-height: 1.4 !important;
        }
      `}</style>
      <div className="print-container text-gray-900 font-sans leading-relaxed w-[210mm] min-h-[297mm] h-auto mx-auto bg-white shadow-2xl p-[15mm] box-border print-optimized">
        {/* Header */}
        <header className="mb-8 text-center break-inside-avoid">
        <div className="mb-3">
            <span className="text-3xl font-bold tracking-wide mr-4">{data.profile.name}</span>
            <span className="text-xl text-gray-700 font-medium">{data.profile.title}</span>
        </div>
        
        <div className="flex justify-center items-center gap-6 text-sm text-gray-600 flex-wrap">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Mail size={14} />
            <a href={`mailto:${data.profile.email}`} className="text-blue-600 underline decoration-blue-300">{data.profile.email}</a>
          </div>
          <div className="flex items-center gap-1">
            <Phone size={14} />
            <span>{data.profile.phone}</span>
          </div>
          {birthDate && (
            <div className="flex items-center gap-1">
              <Cake size={14} />
              <span>{birthDate}</span>
            </div>
          )}
        </div>
      </header>

      {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="mb-4 content-section">
              <SectionTitle title="专业技能" />
              <div className="pl-1 compact-section">
                  {data.skills.map((group) => (
                    <div key={group.id} className="mb-3 tight-spacing">
                       {/* Category Title */}
                       <h3 className="font-bold text-gray-900 mb-1 text-sm">{group.name}</h3>
                       {/* List Items */}
                       <div 
                          className="pl-3 text-xs leading-5 text-gray-800 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:mb-0.5"
                          dangerouslySetInnerHTML={{ __html: group.content }}
                       />
                    </div>
                  ))}
              </div>
          </section>
        )}

      {/* Experience */}
        <section className="mb-4 content-section">
          <SectionTitle title="工作经历" />
          {data.experience.map((exp, index) => (
            <div key={exp.id} className={`mb-4 ${index > 0 ? 'mt-6' : ''}`}>
              <div className="flex justify-between items-baseline mb-1 font-bold text-gray-800 tight-spacing">
                  <div className="flex items-center gap-1 flex-wrap">
                      <span className="text-base">{exp.company}</span>
                      <span className="font-normal text-gray-400">-</span>
                      <span className="text-sm">{exp.title}</span>
                      {exp.location && (
                          <div className="flex items-center gap-0.5 text-xs font-normal text-gray-600 ml-1">
                              <MapPin size={12} />
                              <span>{exp.location}</span>
                          </div>
                      )}
                  </div>
                  <div className="text-xs text-gray-600 whitespace-nowrap ml-2">{exp.date}</div>
              </div>
              
              <div 
                  className="text-xs leading-5 text-gray-800 pl-3 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:mb-0.5 [&_.ql-indent-1]:pl-6 [&_.ql-indent-2]:pl-10 [&_.ql-indent-3]:pl-14"
                  dangerouslySetInnerHTML={{ __html: exp.details }}
              />
            </div>
          ))}
        </section>

      {/* Projects */}
        <section className="mb-4 content-section">
          <SectionTitle title="项目经历" />
          {data.projects.map((project, index) => (
            <div key={project.id} className={`mb-4 ${index > 0 ? 'mt-4' : ''}`}>
              {/* Row 1: Name and Date */}
              <div className="flex justify-between items-baseline mb-1 font-bold text-gray-800 tight-spacing">
                <div className="text-base">{project.name}</div>
                <div className="text-xs text-gray-600 whitespace-nowrap ml-2">{project.date}</div>
              </div>
              
              {/* Row 2: Summary */}
              {project.summary && (
                  <div className="mb-0.5 text-xs text-gray-800">
                      <span className="font-bold text-gray-900">项目描述：</span>
                      <span>{project.summary}</span>
                  </div>
              )}

              {/* Row 3: Tech Stack */}
              {project.techStack && (
                  <div className="mb-0.5 text-xs text-gray-800">
                      <span className="font-bold text-gray-900">技术架构：</span>
                      <span>{project.techStack}</span>
                  </div>
              )}

              {/* Row 4: Responsibilities */}
              <div className="mt-0.5">
                   <div className="font-bold text-gray-900 text-xs mb-0.5">职责描述：</div>
                   <div 
                      className="text-xs leading-5 text-gray-800 pl-3 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:mb-0.5 [&_.ql-indent-1]:pl-6 [&_.ql-indent-2]:pl-10 [&_.ql-indent-3]:pl-14"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                  />
              </div>
            </div>
          ))}
        </section>

      {/* Education */}
        <section className="content-section">
          <SectionTitle title="教育经历" />
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-center mb-1 text-gray-800 tight-spacing">
              <div className="flex items-center gap-1 font-bold">
                  <GraduationCap size={16} className="text-blue-600" />
                  <span className="text-sm">{edu.school}</span>
              </div>
              <div className="text-sm font-medium">{edu.degree}</div>
              <div className="text-xs text-gray-600">{edu.date}</div>
            </div>
          ))}
        </section>

      {/* Self Evaluation */}
        {data.profile.summary && (
          <section className="mt-4 content-section">
            <SectionTitle title="自我评价" />
            <div 
              className="text-xs leading-5 text-gray-800 pl-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:mb-0.5"
              dangerouslySetInnerHTML={{ __html: data.profile.summary }} 
            />
          </section>
        )}
    </div>
    </>
  );
}
