import React from 'react';

const DrawingToolbar = ({ onModeChange, activeMode, onDelete, selectedCount }) => {
  const modes = [
    {
      id: 'draw_point',
      label: 'Point',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
        </svg>
      )
    },
    {
      id: 'draw_line_string',
      label: 'Line',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7 7 10 10" />
          <circle cx="7" cy="7" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      )
    },
    {
      id: 'draw_polygon',
      label: 'Polygon',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 11l7-7 7 7-7-7-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="absolute bottom-[30px] right-[134px] z-30 flex flex-row items-center gap-2 rounded-lg bg-white p-2 shadow-[0px_2px_7px_0px_#00000026] backdrop-blur-sm">
      {modes.map((mode) => (
        <button
          key={mode.id}
          disabled={mode.label !== 'Point' && false}
          onClick={() => onModeChange(mode.id)}
          title={mode.label}
          className={`flex h-10 w-10 items-center justify-center rounded-md transition-all hover:bg-slate-100 ${activeMode === mode.id ? 'bg-purple-100 text-[#7844C1]' : 'text-slate-600'
            } disabled:text-slate-300 disabled:cursor-not-allowed`}
        >
          {mode.icon}
        </button>
      ))}

      <div className="mx-1 h-8 w-[1px] bg-slate-200" />

      <button
        onClick={onDelete}
        disabled={selectedCount === 0}
        title="Delete Selected"
        className={`flex h-10 w-10 items-center justify-center rounded-md transition-all ${selectedCount > 0
          ? 'text-red-500 hover:bg-red-50'
          : 'text-slate-300 cursor-not-allowed'
          }`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
        </svg>
      </button>
    </div>
  );
};

export default DrawingToolbar;
