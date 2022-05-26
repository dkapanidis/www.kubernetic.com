import React from 'react';
import { Tooltip } from '@mui/material';


interface TooltipWithShortcutProps {
  description?: string,
  shortcut?: string,
  children: any,
  groupShortcut?: string,
  placement?: 'bottom' | 'left' | 'right' | 'top' | 'bottom-end' | 'bottom-start' | 'left-end' | 'left-start' | 'right-end' | 'right-start' | 'top-end' | 'top-start' | undefined
  left?: string,
  visible?: boolean,
  then?: boolean
}
function TooltipWithShortcut({ description, groupShortcut, then = false, shortcut, children, placement, left, visible = true }: TooltipWithShortcutProps) {

  if (description === undefined) {
    return <>
      {children}
    </>;
  }

  if (visible === false) {
    return children;
  }
  return (
    <Tooltip title={
      <div className="bg-gray-800 p-1 border rounded-md border-gray-700 text-xs text-gray-200 space-x-2 drop-shadow-lg">
        <span>{description}</span>
        {shortcut && <span className="text-xs text-gray-400">
          {groupShortcut && <span><span className="bg-gray-700 text-gray-300 px-1 py-0.5 rounded-sm font-mono text-xs">{groupShortcut}</span>
            &nbsp;
            {then && <span>then</span> || <span>+</span>}
            &nbsp;
          </span>}
          <span className="bg-gray-700 text-gray-300 px-1 py-0.5 rounded-sm font-mono text-xs">{shortcut}</span></span>}
      </div>
    } enterDelay={750} enterNextDelay={750} placement={placement} componentsProps={{
      tooltip: {
        sx: {
          backgroundColor: 'transparent',
          color: 'none',
          padding: '0px',
          position: 'relative',
          left: left,
        },
      },
    }}>
      {children}
    </ Tooltip >
  );
}

export default TooltipWithShortcut;
