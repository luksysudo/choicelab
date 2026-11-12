import React from 'react';

export interface TreeNode {
  id: string;
  label: string;
  category?: string;
  icon?: string;
  isInvalid?: boolean;
  children?: TreeNode[];
}

interface TreeDiagramProps {
  rootLabel: string;
  data: TreeNode[];
  selectedPath?: string[];
  onSelectLeaf?: (path: string[]) => void;
  title?: string;
}

export const TreeDiagram: React.FC<TreeDiagramProps> = ({
  rootLabel,
  data,
  selectedPath = [],
  onSelectLeaf,
  title = 'Diagram Pohon Kemungkinan'
}) => {
  return (
    <div className="w-full bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
        <div>
          <h4 className="font-display font-semibold text-slate-800 text-sm tracking-wide">{title}</h4>
          <p className="text-xs text-slate-500 mt-0.5">Jelajahi setiap cabang untuk melihat pembentukan kemungkinan</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Cabang Sah</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
            <span>Dibatasi / Terkunci</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto py-2">
        <div className="min-w-[620px] flex items-center">
          {/* Root node */}
          <div className="shrink-0 mr-6">
            <div className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-xs shadow-md text-center border border-indigo-500">
              <span className="font-semibold block">{rootLabel}</span>
              <span className="text-[10px] text-indigo-100">Titik Awal</span>
            </div>
          </div>

          {/* Level 1 branches */}
          <div className="space-y-4 flex-1">
            {data.map((node1) => {
              const isNode1Selected = selectedPath[0] === node1.id;
              return (
                <div key={node1.id} className="relative flex items-center">
                  {/* Branch line from root */}
                  <div className="w-6 h-[2px] bg-indigo-200 mr-2 shrink-0" />

                  {/* Node 1 box */}
                  <div
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all shrink-0 w-36 ${
                      node1.isInvalid
                        ? 'bg-rose-50 border-rose-200 text-rose-600 opacity-60'
                        : isNode1Selected
                        ? 'bg-indigo-50 border-indigo-400 text-indigo-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{node1.label}</span>
                      {node1.icon && <span className="text-sm">{node1.icon}</span>}
                    </div>
                    {node1.category && (
                      <span className="text-[10px] text-slate-400 block mt-0.5">{node1.category}</span>
                    )}
                  </div>

                  {/* Level 2 children if available */}
                  {node1.children && node1.children.length > 0 && (
                    <div className="ml-4 space-y-2 border-l-2 border-indigo-100 pl-3 py-1 flex-1">
                      {node1.children.map((node2) => {
                        const isNode2Selected = selectedPath[1] === node2.id;
                        return (
                          <div key={node2.id} className="flex items-center gap-2">
                            <div className="w-4 h-[2px] bg-indigo-200 shrink-0" />
                            <div
                              onClick={() => {
                                if (!node2.isInvalid && onSelectLeaf) {
                                  onSelectLeaf([node1.id, node2.id]);
                                }
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                                node2.isInvalid
                                  ? 'bg-rose-50/70 border-rose-200 text-rose-500 line-through opacity-60 cursor-not-allowed'
                                  : isNode2Selected
                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-sm'
                                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                              }`}
                            >
                              <span>{node2.label}</span>
                              {node2.isInvalid ? (
                                <span className="text-[10px] text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded font-normal no-underline">
                                  Terkunci
                                </span>
                              ) : (
                                <span className="text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">
                                  Valid
                                </span>
                              )}
                            </div>

                            {/* Level 3 children if available */}
                            {node2.children && node2.children.length > 0 && (
                              <div className="flex items-center gap-2 ml-2">
                                <div className="w-3 h-[2px] bg-slate-300 shrink-0" />
                                <div className="flex gap-1.5">
                                  {node2.children.map((node3) => (
                                    <span
                                      key={node3.id}
                                      className={`text-[11px] px-2 py-1 rounded border ${
                                        node3.isInvalid
                                          ? 'bg-rose-50 border-rose-200 text-rose-400 line-through'
                                          : 'bg-white border-slate-200 text-slate-700'
                                      }`}
                                    >
                                      {node3.label}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
