/**
 * Storage Type Selector Component
 * Allows admin to choose between Supabase and GitHub storage
 */

import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Database, Github, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface StorageTypeSelectorProps {
    value: 'supabase' | 'github';
    onChange: (value: 'supabase' | 'github') => void;
    disabled?: boolean;
}

const StorageTypeSelector: React.FC<StorageTypeSelectorProps> = ({
    value,
    onChange,
    disabled = false,
}) => {
    return (
        <div className="space-y-4">
            <div>
                <Label className="text-base font-semibold">Storage Type *</Label>
                <p className="text-sm text-gray-400 mt-1">
                    Choose where to store template files
                </p>
            </div>

            <RadioGroup
                value={value}
                onValueChange={(val) => onChange(val as 'supabase' | 'github')}
                disabled={disabled}
                className="space-y-3"
            >
                {/* Supabase Option */}
                <div
                    className={`flex items-start space-x-3 p-4 rounded-lg border transition-all ${value === 'supabase'
                            ? 'border-dexRed bg-dexRed/5'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                >
                    <RadioGroupItem value="supabase" id="storage-supabase" />
                    <div className="flex-1">
                        <label
                            htmlFor="storage-supabase"
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <Database className="h-5 w-5 text-blue-400" />
                            <span className="font-medium text-white">Supabase Storage</span>
                        </label>
                        <p className="text-sm text-gray-400 mt-1">
                            Store files in Supabase Storage bucket (current default)
                        </p>
                        <div className="mt-2 text-xs text-gray-500 space-y-1">
                            <div>✓ Private storage</div>
                            <div>✓ Integrated with database</div>
                            <div>✓ Signed download URLs</div>
                        </div>
                    </div>
                </div>

                {/* GitHub Option */}
                <div
                    className={`flex items-start space-x-3 p-4 rounded-lg border transition-all ${value === 'github'
                            ? 'border-dexRed bg-dexRed/5'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                >
                    <RadioGroupItem value="github" id="storage-github" />
                    <div className="flex-1">
                        <label
                            htmlFor="storage-github"
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <Github className="h-5 w-5 text-purple-400" />
                            <span className="font-medium text-white">GitHub Repository</span>
                        </label>
                        <p className="text-sm text-gray-400 mt-1">
                            Auto-create public GitHub repository for this template
                        </p>
                        <div className="mt-2 text-xs text-gray-500 space-y-1">
                            <div>✓ Free unlimited storage</div>
                            <div>✓ Version control (Git history)</div>
                            <div>✓ Public repository on GitHub</div>
                            <div>✓ Better CDN performance</div>
                        </div>
                    </div>
                </div>
            </RadioGroup>

            {/* Info Alert */}
            {value === 'github' && (
                <Alert className="border-blue-500/20 bg-blue-500/10">
                    <Info className="h-4 w-4 text-blue-400" />
                    <AlertDescription className="text-sm text-gray-300">
                        A public repository will be automatically created at{' '}
                        <code className="text-blue-400">
                            github.com/{import.meta.env.VITE_GITHUB_OWNER}/template-[id]-[name]
                        </code>
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default StorageTypeSelector;
