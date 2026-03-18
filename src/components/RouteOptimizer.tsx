'use client'

import { useStore } from '@/lib/store'
import { Route, TrendingUp, Clock, Battery, Zap } from 'lucide-react'

export default function RouteOptimizer() {
  const { orders, drones } = useStore()
  const activeOrders = orders.filter(o => ['pending', 'preparing', 'dispatched', 'in_flight'].includes(o.status))

  const optimizationMetrics = [
    { label: 'Avg Delivery Time', value: '12 min', improvement: '-18%', icon: Clock, color: '#14b8a6' },
    { label: 'Route Efficiency', value: '94%', improvement: '+8%', icon: Route, color: '#3b82f6' },
    { label: 'Battery Usage', value: '0.8%/km', improvement: '-12%', icon: Battery, color: '#22c55e' },
    { label: 'Orders/Hour', value: '24', improvement: '+15%', icon: Zap, color: '#eab308' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Route Optimizer</h2>
        <p className="text-gray-400">AI-powered route optimization for drone deliveries</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {optimizationMetrics.map(m => (
          <div key={m.label} className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
            <div className="flex items-center gap-2 mb-3">
              <m.icon className="w-5 h-5" style={{ color: m.color }} />
              <span className="text-xs text-gray-400">{m.label}</span>
            </div>
            <p className="text-2xl font-bold">{m.value}</p>
            <p className="text-xs text-green-400 mt-1">{m.improvement} vs. unoptimized</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Route assignments */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Optimized Route Assignments</h3>
          <div className="space-y-3">
            {activeOrders.map(order => {
              const assignedDrone = order.droneId ? drones.find(d => d.id === order.droneId) : null
              return (
                <div key={order.id} className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{order.items}</span>
                    <span className="text-xs text-teal-400">{order.distance}km</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{order.address}</span>
                    {assignedDrone && <span className="text-blue-400">@ {assignedDrone.name}</span>}
                  </div>
                  {order.eta && (
                    <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                      <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${Math.max(10, 100 - (order.eta / 15) * 100)}%` }} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Optimization stats */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Delivery Volume (Today)</h3>
          <div className="flex items-end gap-1 h-40">
            {Array.from({ length: 24 }, (_, i) => {
              const h = i < 6 ? 5 + Math.random() * 10 : i < 10 ? 20 + Math.random() * 40 : i < 14 ? 50 + Math.random() * 30 : i < 18 ? 60 + Math.random() * 30 : i < 21 ? 40 + Math.random() * 30 : 10 + Math.random() * 15
              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full bg-teal-500 rounded-t-sm" style={{ height: `${h}%` }} />
                  {i % 4 === 0 && <span className="text-[8px] text-gray-500 mt-1">{i}h</span>}
                </div>
              )
            })}
          </div>

          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-medium">Fleet Utilization</h4>
            {['delivering', 'returning', 'idle', 'charging'].map(s => {
              const count = drones.filter(d => d.status === s).length
              const pct = (count / drones.length) * 100
              const colors: Record<string, string> = { delivering: 'bg-green-500', returning: 'bg-blue-500', idle: 'bg-yellow-500', charging: 'bg-purple-500' }
              return (
                <div key={s}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400 capitalize">{s}</span>
                    <span>{count} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${colors[s]}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
