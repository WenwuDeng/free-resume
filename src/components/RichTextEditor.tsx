import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ['clean']
  ],
};

const formats = [
  'bold', 'italic', 'underline', 'strike',
  'list', 'indent'
];

export default function RichTextEditor({ value, onChange, placeholder, className }: Props) {
  return (
    <div className={`rich-text-editor ${className || ''}`}>
      <ReactQuill 
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}
