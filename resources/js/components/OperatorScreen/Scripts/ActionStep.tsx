import React from 'react';
import { Action, Prompt } from '@/types';
import { PromptField } from './PromptField';
import { ACTION_EMAIL_DELIVER, ACTION_TXF_DELIVER } from '@/constants/constants';
import { Button } from '@/components/ui/button';
import { TransferAndDeliver, EmailAndDeliver } from './Actions';

const ActionStep: React.FC<{
  action: Action;
  prompts?: Prompt[];
  type?: number
  onPromptChange: (actionId: string, promptCaption: string, value: string) => void;
}> = ({ action, prompts, type, onPromptChange }) => {
  const isHidden = action.show_logic ? true : false;

  const getElementForType = (type: number | undefined, actionContact: any) => {
    switch (type) {
      case ACTION_TXF_DELIVER:
        return (
          <Button variant="default" size="sm" onClick={() => TransferAndDeliver(actionContact)}>
            Transfer & Deliver
          </Button>
        );
      case ACTION_EMAIL_DELIVER:
        return (
          <Button variant="default" size="sm" onClick={() => EmailAndDeliver(actionContact)}>
            Email & Deliver
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`p-4 mb-4 bg-white rounded-lg shadow ${
        isHidden ? 'hidden' : ''
      } ${action.dispatch_only ? 'border-l-4 border-blue-500' : ''}`}
    >
      <>
        <div className="flex justify-between items-center">
          <div
            className="prose prose-sm"
            dangerouslySetInnerHTML={{
              __html: action.action_text
                .replace(/\r\n/g, '<br>')
                .replace(
                  '[e]',
                  `<strong>${(action as any).props?.actionContact?.employee?.name || 'Employee'}</strong>`
                )
                .replace(
                  '[a]',
                  `<strong>${action?.props?.actionName || 'Action'}</strong>`
                ),
            }}
          />
          {getElementForType(type, (action as any).props?.actionContact)}
        </div>
      </>


      {action.helper && (
        <div className="mb-3 p-2 bg-blue-50 text-blue-700 text-sm rounded">
          {action.helper}
        </div>
      )}

      {prompts && prompts.length > 0 && (
        <div className="space-y-4">
          {prompts.map((prompt, idx) => (
            <div key={idx} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {prompt.caption}
                {prompt.required ? (
                  <span className="text-red-500 ml-1">*</span>
                ) : null}
              </label>
              {prompt.helptext && (
                <div className="text-xs text-gray-500 italic">
                  {prompt.helptext}
                </div>
              )}
              <PromptField
                prompt={prompt}
                actionSort={action.sort}
                onChange={(value) =>
                  onPromptChange(action.id, prompt.caption, value)
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { ActionStep };