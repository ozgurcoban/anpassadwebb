'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface AIPromptProps {
  children: React.ReactNode;
  label?: string;
}

export function AIPrompt({ children, label = 'AI Prompt' }: AIPromptProps) {
  const [copied, setCopied] = useState(false);

  // Extract text content from children
  const getPromptText = (node: React.ReactNode): string => {
    if (typeof node === 'string') {
      return node;
    }
    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<any>;
      if (element.props && element.props.children) {
        return getPromptText(element.props.children);
      }
    }
    if (Array.isArray(node)) {
      return node.map(getPromptText).join('');
    }
    return '';
  };

  const promptText = getPromptText(children).trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="my-6 relative">
      <div className="relative rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200 dark:border-purple-800/50 shadow-sm">
        {/* Label */}
        <div className="absolute -top-3 left-4 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold rounded-full shadow-sm">
          {label}
        </div>
        
        {/* Content */}
        <div className="p-6 pr-14">
          <div className="font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {children}
          </div>
        </div>
        
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 rounded-md bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
          title="Kopiera prompt"
          aria-label="Kopiera prompt till urklipp"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      
      {/* Subtle shadow effect */}
      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-purple-200/50 to-blue-200/50 dark:from-purple-800/20 dark:to-blue-800/20 blur-xl transform translate-y-1" />
    </div>
  );
}