'use client'

import { useState, useEffect } from 'react'
import SlotGrid from './SlotGrid'
import Countdown from './Countdown'
import StatusIndicator from './StatusIndicator'
import { useWebSocket } from '@/lib/useWebSocket'

export default function FiveGame() {
  const { connected, slots, status, sendMessage } = useWebSocket()
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')

  const handleConnectWallet = async () => {
    // Placeholder for wallet connection logic
    setWalletConnected(true)
    setWalletAddress('SOL...abcd')
  }

  const handleJoinRound = () => {
    if (walletConnected && slots < 5) {
      sendMessage({
        type: 'join_round',
        wallet: walletAddress,
      })
    }
  }

  const isFull = slots >= 5

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-gray-400 text-sm mb-2">Slots Filled</div>
          <div className="text-3xl font-bold text-solana-500">{slots}/5</div>
        </div>
        <div className="card text-center">
          <div className="text-gray-400 text-sm mb-2">Status</div>
          <div className={`text-lg font-semibold ${connected ? 'text-green-400' : 'text-red-400'}`}>
            {connected ? 'Live' : 'Offline'}
          </div>
        </div>
        <div className="card text-center">
          <div className="text-gray-400 text-sm mb-2">Wallet</div>
          <div className="text-lg font-semibold text-blue-400">
            {walletConnected ? 'Connected' : 'Not Connected'}
          </div>
        </div>
      </div>

      {/* Main Game Card */}
      <div className="card space-y-6">
        {/* Status */}
        <StatusIndicator status={status as any} />

        {/* Slot Grid */}
        <SlotGrid filledSlots={slots} />

        {/* Countdown */}
        <Countdown isActive={connected} />

        {/* Action Buttons */}
        <div className="space-y-3">
          {!walletConnected ? (
            <button
              onClick={handleConnectWallet}
              className="btn-primary w-full"
            >
              Connect Wallet
            </button>
          ) : (
            <button
              onClick={handleJoinRound}
              disabled={!connected || isFull}
              className="btn-primary w-full"
            >
              {isFull ? 'Round Full' : 'Join Round'}
            </button>
          )}

          {walletConnected && (
            <button
              className="w-full px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-all duration-200"
              onClick={() => setWalletConnected(false)}
            >
              Disconnect Wallet
            </button>
          )}
        </div>

        {/* Info */}
        {isFull && (
          <div className="bg-green-900 border border-green-600 rounded-lg p-4 text-center">
            <p className="text-green-200 font-semibold">
              Round is full! Waiting for settlement...
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="card bg-opacity-50">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <div className="text-gray-500 text-xs mb-1">Network</div>
            <div className="text-white font-mono">Devnet</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Mode</div>
            <div className="text-white font-mono">5-in/5-back</div>
          </div>
        </div>
      </div>
    </div>
  )
}
