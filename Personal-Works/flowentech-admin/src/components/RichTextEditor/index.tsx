'use client';
import React, { useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  minHeight?: number;
};

const RichTextEditor: React.FC<Props> = ({
  value,
  onChange,
  placeholder = 'Write here...',
  minHeight = 400,
}) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result;
          console.log('Base64 Image:', base64Image); // Debugging
          const editor = quillRef.current?.getEditor();
          if (editor && base64Image) {
            const range = editor.getSelection();
            if (range) {
              editor.insertEmbed(range.index, 'image', base64Image);
            }
          }
        };
        reader.onerror = () => {
          console.error('Error reading file:', reader.error);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
  ];

  return (
    <div
      style={{
        minHeight: `${minHeight}px`,
      }}
      className="quill-editor rounded-[7px] border-[1.5px] border-stroke bg-white text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white"
    >
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;
