import React from 'react';

export interface MatrixRow {
  id: string;
  label: string;
  badge?: string;
}

export interface MatrixCol {
  id: string;
  label: string;
}

interface TableMatrixProps {
  title: string;
  rowHeader: string;
  colHeader: string;
  rows: MatrixRow[];
  cols: MatrixCol[];
  isCellValid: (rowId: string, colId: string) => boolean;
  invalidReason?: (rowId: string, colId: string) => string | undefined;
  selectedPair?: [string, string];
  onSelectCell?: (rowId: string, colId: string) => void;
  multiplierText?: string;
}

export const TableMatrix: React.FC<TableMatrixProps> = ({
  title,
  rowHeader,
  colHeader,
  rows,
  cols,
  isCellValid,
  invalidReason,
  selectedPair,
  onSelectCell,
  multiplierText
}) => {
  let validCount = 0;
  let totalCount = rows.length * cols.length;

  rows.forEach((r) => {
    cols.forEach((c) => {
      if (isCellValid(r.id, c.id)) validCount++;
    });
  });

  return (
    <div className="w-full bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-sm backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b border-slate-100">
        <div>
          <h4 className="font-display font-semibold text-slate-800 text-sm tracking-wide">{title}</h4>
          <p className="text-xs text-slate-500 mt-0.5">Tabel pasangan kombinasi ({rowHeader} × {colHeader})</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md font-semibold">
            {validCount} / {totalCount} Pasangan Sah
          </span>
          {multiplierText && (
            <span className="font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-1 rounded-md">
              {multiplierText}
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="p-2.5 text-left font-semibold text-slate-500 bg-slate-50 border border-slate-200 rounded-tl-lg">
                {rowHeader} \ {colHeader}
              </th>
              {cols.map((col) => (
                <th
                  key={col.id}
                  className="p-2.5 text-center font-semibold text-slate-700 bg-slate-50 border border-slate-200"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="p-2.5 font-medium text-slate-700 bg-slate-50/50 border border-slate-200 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span>{row.label}</span>
                    {row.badge && (
                      <span className="text-[10px] text-slate-400 font-normal">({row.badge})</span>
                    )}
                  </div>
                </td>
                {cols.map((col) => {
                  const valid = isCellValid(row.id, col.id);
                  const reason = invalidReason ? invalidReason(row.id, col.id) : undefined;
                  const isSelected = selectedPair && selectedPair[0] === row.id && selectedPair[1] === col.id;

                  return (
                    <td
                      key={col.id}
                      onClick={() => onSelectCell && onSelectCell(row.id, col.id)}
                      className={`p-2.5 text-center border transition-all cursor-pointer ${
                        !valid
                          ? 'bg-rose-50/60 border-rose-200 text-rose-500 cursor-not-allowed'
                          : isSelected
                          ? 'bg-indigo-100/80 border-indigo-400 text-indigo-900 font-semibold ring-2 ring-indigo-400 ring-inset'
                          : 'bg-white hover:bg-emerald-50/60 border-slate-200 text-slate-700'
                      }`}
                    >
                      {valid ? (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-emerald-600 font-medium">✓ Sah</span>
                          <span className="text-[10px] text-slate-400">1 pasangan</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-rose-500 font-semibold">✗ Terlarang</span>
                          {reason && <span className="text-[9px] text-rose-400 mt-0.5">{reason}</span>}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
