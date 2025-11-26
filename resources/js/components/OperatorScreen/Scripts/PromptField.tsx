import React, { useState } from 'react';
import { Prompt } from '@/types';
import { PROMPT_TYPE_SINGLELINE, PROMPT_TYPE_MULTILINE, PROMPT_TYPE_STRICTDROPDOWN, PROMPT_TYPE_CONDITIONAL } from '@/constants/constants';
const PromptField: React.FC<{
  prompt: Prompt;
  actionSort: number;
  onChange: (value: string) => void;
}> = ({ prompt, actionSort, onChange }) => {
  const [value, setValue] = useState(prompt.value || '');
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setCharCount(newValue.length);
    onChange(newValue);
  };

  const inputClass = `w-full px-3 py-2 border rounded-md ${
    prompt.required ? 'border-red-300' : 'border-gray-300'
  }`;

  switch (prompt.ptype) {
    case PROMPT_TYPE_SINGLELINE:
      return (
        <div className="space-y-1">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            maxLength={prompt.maxchar}
            className={inputClass}
            placeholder={prompt.caption}
          />
          <div className="text-xs text-gray-500 text-right">
            {charCount}/{prompt.maxchar}
          </div>
        </div>
      );

    case PROMPT_TYPE_MULTILINE:
      return (
        <div className="space-y-1">
          <textarea
            value={value}
            onChange={handleChange}
            maxLength={prompt.maxchar}
            rows={3}
            className={inputClass}
            placeholder={prompt.caption}
          />
          <div className="text-xs text-gray-500 text-right">
            {charCount}/{prompt.maxchar}
          </div>
        </div>
      );

    case PROMPT_TYPE_STRICTDROPDOWN:
      const options = prompt.options?.split('||')[0].split('|') || [];
      return (
        <select value={value} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.trim()}>
              {opt}
            </option>
          ))}
          <option value="Caller refused">Caller refused</option>
        </select>
      );

    case PROMPT_TYPE_CONDITIONAL:
      const [condOptions, condActions] = prompt.options?.split('||') || ['', ''];
      const opts = condOptions.split('|');
      return (
        <select value={value} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          {opts.map((opt, idx) => (
            <option key={idx} value={opt.trim()}>
              {opt}
            </option>
          ))}
        </select>
      );

    default:
      return (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className={inputClass}
        />
      );
  }
};

export { PromptField };