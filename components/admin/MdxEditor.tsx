"use client";

import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin, markdownShortcutPlugin, linkPlugin, linkDialogPlugin, tablePlugin, frontmatterPlugin, codeBlockPlugin, codeMirrorPlugin, UndoRedo, BoldItalicUnderlineToggles, BlockTypeSelect, CreateLink, InsertTable, InsertThematicBreak, ListsToggle, diffSourcePlugin, DiffSourceToggleWrapper, toolbarPlugin } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { useRef } from 'react';

interface MdxEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MdxEditor({ value, onChange }: MdxEditorProps) {
  return (
    <div className="mdx-editor-wrapper" style={{ 
      border: '1px solid var(--border)', 
      borderRadius: '8px', 
      overflow: 'hidden',
      background: 'var(--bg-tertiary)' 
    }}>
      <MDXEditor
        markdown={value}
        onChange={onChange}
        contentEditableClassName="prose prose-invert max-w-none p-4 min-h-[300px] text-sm focus:outline-none"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          tablePlugin(),
          frontmatterPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'typescript' }),
          codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', ts: 'TypeScript', tsx: 'TypeScript (React)', css: 'CSS', json: 'JSON', html: 'HTML', python: 'Python', bash: 'Bash', sh: 'Shell' } }),
          diffSourcePlugin({ diffMarkdown: value, viewMode: 'rich-text' }),
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper>
                <div className="flex items-center gap-1 flex-wrap p-1" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                  <UndoRedo />
                  <span className="w-px h-4 bg-[var(--border)] mx-1" />
                  <BoldItalicUnderlineToggles />
                  <span className="w-px h-4 bg-[var(--border)] mx-1" />
                  <BlockTypeSelect />
                  <span className="w-px h-4 bg-[var(--border)] mx-1" />
                  <ListsToggle />
                  <span className="w-px h-4 bg-[var(--border)] mx-1" />
                  <CreateLink />
                  <InsertTable />
                  <InsertThematicBreak />
                </div>
              </DiffSourceToggleWrapper>
            )
          })
        ]}
      />
    </div>
  );
}
