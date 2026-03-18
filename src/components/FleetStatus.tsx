'use client'

import { useStore } from '@/lib/store'
import { Plane, Battery, Gauge, Package, CheckCircle, AlertTriangle } from 'lucide-react'

const statusColors = { delivering: 'bg-green-500', returning: 'bg-blue-500', idle: 'bg-yellow-500', charging: 'bg-purple-500', maintenance: 'bg-gray-500' }

export default function FleetStatus() {
  const { drones } = useStore()
  const avgBattery = drones.reduce((s, d) => s + d.battery, 0) / drones.length
  const statusCounts = Object.fromEntries(['delivering', 'returning', 'idle', 'charging', 'maintenance'].map(s => [s, drones.filter(d => d.status === s).length]))

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Fleet Status</h2>
        <p className="text-gray-400">Delivery drone fleet overview and monitoring</p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="bg-gray-900 rounded-2xl border border-gray-800 p-5 text-center">
            <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${statusColors[status as keyof typeof statusColors]}`} />
            <p className="text-2xl font-bold">{count}</p>
            <p className="text-xs text-gray-400 capitalize">{status}</p>
          </div>
        ))}
      </div>

      {/* Battery overview */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Battery Levels</h3>
          <span className="text-sm text-gray-400">Avg: {avgBattery.toFixed(0)}%</span>
        </div>
        <div className="grid grid-cols-8 gap-3">
          {drones.map(d => (
            <div key={d.id} className="text-center">
              <div className="w-10 h-16 mx-auto bg-gray-800 rounded-lg overflow-hidden border border-gray-700 relative">
                <div className="absolute bottom-0 w-full transition-all" style={{
                  height: `${d.battery}%`,
                  backgroundColor: d.battery > 60 ? '#22c55e' : d.battery > 30 ? '#eab308' : '#ef4444'
                }} />
              </div>
              <p className="text-[9px] text-gray-400 mt-1">{d.name.split('-')[1]}</p>
              <p className="text-[10px] font-medium">{d.battery.toFixed(0)}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fleet table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Drone</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Battery</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Speed</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Payload</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {drones.map(d => (
              <tr key={d.id} className="hover:bg-gray-800/50">
                <td className="px-4 py-3 text-sm font-medium">{d.name}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${statusColors[d.status]}`} />
                  <span className="text-sm capitalize">{d.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-14 bg-gray-700 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ width: `${d.battery}%`, backgroundColor: d.battery > 50 ? '#22c55e' : '#eab308' }} />
                    </div>
                    <span className="text-xs">{d.battery.toFixed(0)}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{d.speed.toFixed(0)} kph</td>
                <td className="px-4 py-3 text-sm">{d.payload.toFixed(1)}/{d.maxPayload}kg</td>
                <td className="px-4 py-3 text-sm text-gray-400">{d.currentOrder || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
