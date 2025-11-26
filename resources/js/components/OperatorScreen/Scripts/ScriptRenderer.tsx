import React, { useState, useEffect } from 'react';
import { AlertCircle, Plus } from 'lucide-react';
import { ScriptData, Action } from '@/types';
import { ScriptSection } from './ScriptSection';
import { ACTION_LEGACY, PROMPT_TYPE_SINGLELINE, PROMPT_TYPE_STRICTDROPDOWN, PROMPT_TYPE_MULTILINE } from '@/constants/constants';

const ScriptRenderer: React.FC<{scriptContent: any, setScriptContent: React.Dispatch<React.SetStateAction<string>>}> = ({scriptContent, setScriptContent}) => {
  const [promptValues, setPromptValues] = useState<Record<string, Record<string, string>>>({});
  const [showMiscNotes, setShowMiscNotes] = useState(false);
  const [miscNotes, setMiscNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handlePromptChange = (actionId: string, promptCaption: string, value: string) => {
    setPromptValues((prev) => ({
      ...prev,
      [actionId]: {
        ...(prev[actionId] || {}),
        [promptCaption]: value,
      },
    }));
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="text-red-500" />
          <div>
            <h3 className="font-semibold text-red-800">Error</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!scriptContent) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center text-gray-500">Loading script...</div>
      </div>
    );
  }

  // Group actions by section
  const actionsBySection: Record<number, Action[]> = {};

  scriptContent.actions?.forEach((action) => {
    if (!actionsBySection[action.section]) {
      actionsBySection[action.section] = [];
    }
    actionsBySection[action.section].push(action);
  });

  return (
    <div>
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        {scriptContent.employee ? (
          <div>
            <div className="font-semibold">
              Employee: <span className="font-normal">{scriptContent.employee.name}</span>
            </div>
            {scriptContent.employee.excuse &&
              scriptContent.employee.excuse !== 'No excuse' &&
              scriptContent.employee.excuse !== 'None' && (
                <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 rounded">
                  {scriptContent.employee.excuse}
                </div>
              )}
          </div>
        ) : (
          <div className="font-semibold">
            Calltype: <span className="font-normal">{scriptContent.title}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {Object.entries(actionsBySection).map(([sectionNum, actions]) => (
          <ScriptSection
            key={sectionNum}
            sectionNum={parseInt(sectionNum)}
            actions={actions}
            prompts={scriptContent.prompts}
            visible={scriptContent.sections[parseInt(sectionNum)]?.visible === 1 || true}
            onPromptChange={handlePromptChange}
          />
        ))}

        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
            onClick={() => setShowMiscNotes(!showMiscNotes)}
          >
            <Plus size={16} /> add notes
          </button>
          {showMiscNotes && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Miscellaneous Notes
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                maxLength={255}
                placeholder="Additional notes..."
                value={miscNotes}
                onChange={(e) => setMiscNotes(e.target.value)}
              />
              <div className="text-xs text-gray-500 text-right mt-1">
                {miscNotes.length}/255
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScriptRenderer;