'use client'

import { useState, useEffect } from 'react'

interface SlotGridProps {
  filledSlots: number
}

export default function SlotGrid({ filledSlots }: SlotGridProps) {
  const slots = Array.from({ length: 5 }, (_, i) => i < filledSlots)

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-300">Slot Status</h3>
      <div className="grid grid-cols-5 gap-3">
        {slots.map((filled, idx) => (
          <div
            key={idx}
            className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
              filled
                ? 'bg-green-500 border-green-400 shadow-lg shadow-green-500'
                : 'bg-gray-800 border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{idx + 1}</div>
              {filled && (
                <div className="text-xs text-green-100 mt-1">✓</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 text-center">
        {filledSlots === 5
          ? '🎉 Round complete! Settling now...'
          : `${5 - filledSlots} slot${5 - filledSlots !== 1 ? 's' : ''} remaining`}
      </div>
    </div>
  )
}
