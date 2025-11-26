import React from 'react';
import { Action, Prompt } from '@/types';
import { ActionStep } from './ActionStep';

const ScriptSection: React.FC<{
  sectionNum: number;
  actions: Action[];
  prompts: Record<string, Prompt[]>;
  visible: boolean;
  section?: number;
  onPromptChange: (actionId: string, promptCaption: string, value: string) => void;
}> = ({ sectionNum, actions, prompts, visible, onPromptChange }) => {

  // map prompts to their respective actions
  const actionPrompts: Record<string, Prompt[]> = {};
  Object.values(prompts).forEach((prompt) => {
    if (!actionPrompts[prompt.action_id]) {
      actionPrompts[prompt.action_id] = [];
    }
    actionPrompts[prompt.action_id].push(prompt);
  });
  return (
    <div
      className={`script-section ${visible ? '' : 'hidden'}`}
      data-section={sectionNum}
    >
      {actions.map((action) => (
        <ActionStep
          key={action.id}
          action={action}
          prompts={actionPrompts[action.id] || []}
          onPromptChange={onPromptChange}
          type={action.action_type}
        />
      ))}
    </div>
  );
};
export { ScriptSection };
