import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  loading?: boolean;
  emptyMessage?: string;
  actions?: React.ReactNode;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  onSearch,
  searchPlaceholder = 'Search records...',
  loading = false,
  emptyMessage = 'No records found matching criteria.',
  actions,
}: DataTableProps<T>) {
  const [searchVal, setSearchVal] = useState('');
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchVal);
  };

  return (
    <div className="space-y-3">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {onSearch ? (
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 size-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchVal}
              onChange={(e) => {
                setSearchVal(e.target.value);
                onSearch(e.target.value);
              }}
              className="w-full h-8 pl-9 pr-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
            />
          </form>
        ) : (
          <div />
        )}

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Table Frame */}
      <div className="rounded-xl border border-zinc-800/80 bg-[#0d121a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900/60 border-b border-zinc-800 text-zinc-400 font-mono uppercase text-[10px] tracking-wider">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className={`py-2.5 px-3.5 font-bold ${col.className || ''}`}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="py-12 text-center text-zinc-500">
                    <div className="inline-flex items-center gap-2 font-mono text-xs">
                      <span className="size-3.5 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                      Loading platform records...
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-12 text-center text-zinc-500">
                    <p className="text-xs">{emptyMessage}</p>
                  </td>
                </tr>
              ) : (
                data.map((item, rowIdx) => (
                  <tr
                    key={item.id || rowIdx}
                    className="hover:bg-zinc-800/30 transition-colors text-zinc-300"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className={`py-2.5 px-3.5 align-middle ${col.className || ''}`}>
                        {col.render ? col.render(item) : (item as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Server Pagination Footer */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-900/40 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-400">
          <div>
            Showing <span className="text-zinc-200 font-bold">{data.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{' '}
            <span className="text-zinc-200 font-bold">{Math.min(currentPage * pageSize, totalCount)}</span> of{' '}
            <span className="text-zinc-200 font-bold">{totalCount}</span> entries
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1 || loading}
              className="p-1 rounded-lg border border-zinc-800 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <span>
              Page <strong className="text-zinc-200">{currentPage}</strong> of <strong className="text-zinc-200">{totalPages}</strong>
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || loading}
              className="p-1 rounded-lg border border-zinc-800 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
