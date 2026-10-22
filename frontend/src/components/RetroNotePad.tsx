import { useState } from 'react'
import { motion } from 'motion/react'

interface RetroNotepadProps {
  initialTitle?: string
  onClose?: () => void
}

export function RetroNotepad({ initialTitle = 'Isucklol.txt - Notepad', onClose }: RetroNotepadProps) {
  const [text, setText] = useState(`Hi there! :v\nyou saw that game of life in the background? so cool isn't it?
    \ni'm sorry to break it down for you, but this website is still under construction, how about you come here later?`)

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0}}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="absolute top-100 left-40 z-50 w-[700px] bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] shadow-[4px_4px_10px_rgba(0,0,0,0.4)] font-mono text-sm"
    >
      <div className="bg-black text-[#ff1f3d] border-b-2 border-[#ff1f3d] px-2 py-1 flex items-center justify-between select-none">
        <span className="font-bold tracking-wider text-xs">{initialTitle}</span>
        <div className="flex gap-1">
          <button className="bg-[#c0c0c0] text-black px-1.5 py-0.5 text-xs font-bold border border-t-white border-l-white border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
            _
          </button>
          <button className="bg-[#c0c0c0] text-black px-1.5 py-0.5 text-xs font-bold border border-t-white border-l-white border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
            □
          </button>
          {onClose && (
            <button 
              onClick={onClose}
              className="bg-[#c0c0c0] text-black px-1.5 py-0.5 text-xs font-bold border border-t-white border-l-white border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] px-2 py-0.5 text-black text-xs flex gap-3 border-b border-[#808080] select-none">
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Search</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      {/* Text Area Body */}
      <div className="p-2 bg-white m-1 border border-inset border-[#808080]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 bg-white text-black resize-none focus:outline-none font-mono text-sm leading-relaxed"
          spellCheck={false}
        />
      </div>

      {/* Status Bar */}
      <div className="px-2 py-1 text-[10px] text-black bg-[#c0c0c0] border-t border-white select-none flex justify-between">
        <span>UTF-8</span>
      </div>
    </motion.div>
  )
}