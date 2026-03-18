'use client'

import { useStore } from '@/lib/store'
import { MapPin, Package, Navigation } from 'lucide-react'

const statusColors = { delivering: '#22c55e', returning: '#3b82f6', idle: '#eab308', charging: '#8b5cf6', maintenance: '#6b7280' }

export default function DeliveryMap() {
  const { drones, orders } = useStore()
  const activeOrders = orders.filter(o => ['dispatched', 'in_flight'].includes(o.status))

  return (
    <div className="h-full relative bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <svg className="w-full h-full opacity-10">
          {Array.from({ length: 20 }, (_, i) => (
            <line key={i} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="#14b8a6" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 20 }, (_, i) => (
            <line key={`v${i}`} x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%" stroke="#14b8a6" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Drone markers */}
        {drones.map((drone, i) => {
          const x = ((drone.lng + 122.46) / 0.1) * 100
          const y = ((37.81 - drone.lat) / 0.1) * 100
          return (
            <div key={drone.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${Math.min(95, Math.max(5, x))}%`, top: `${Math.min(95, Math.max(5, y))}%` }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: statusColors[drone.status], boxShadow: `0 0 8px ${statusColors[drone.status]}60` }}>
                <Navigation className="w-3 h-3 text-white" style={{ transform: `rotate(${45}deg)` }} />
              </div>
              {drone.currentOrder && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full border border-gray-900" />
              )}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] text-gray-400 opacity-0 group-hover:opacity-100">
                {drone.name}
              </div>
            </div>
          )
        })}

        {/* Delivery route lines */}
        {activeOrders.map(order => {
          const sx = ((order.pickupLng + 122.46) / 0.1) * 100
          const sy = ((37.81 - order.pickupLat) / 0.1) * 100
          const ex = ((order.dropoffLng + 122.46) / 0.1) * 100
          const ey = ((37.81 - order.dropoffLat) / 0.1) * 100
          return (
            <svg key={order.id} className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1={`${Math.min(95, Math.max(5, sx))}%`} y1={`${Math.min(95, Math.max(5, sy))}%`}
                x2={`${Math.min(95, Math.max(5, ex))}%`} y2={`${Math.min(95, Math.max(5, ey))}%`}
                stroke="#14b8a6" strokeWidth="2" strokeDasharray="6,4" opacity="0.5" />
              {/* Pickup marker */}
              <circle cx={`${Math.min(95, Math.max(5, sx))}%`} cy={`${Math.min(95, Math.max(5, sy))}%`} r="4" fill="#22c55e" />
              {/* Dropoff marker */}
              <circle cx={`${Math.min(95, Math.max(5, ex))}%`} cy={`${Math.min(95, Math.max(5, ey))}%`} r="4" fill="#ef4444" />
            </svg>
          )
        })}
      </div>

      <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
        <p className="text-sm font-medium">Delivery Map</p>
        <p className="text-xs text-teal-400 mt-1">Mapbox GL integration ready</p>
        <div className="mt-2 text-xs text-gray-400">{activeOrders.length} active deliveries</div>
      </div>

      <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-3 border border-gray-700">
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(statusColors).map(([s, c]) => (
            <div key={s} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
              <span className="text-xs text-gray-300 capitalize">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active deliveries sidebar */}
      <div className="absolute top-4 right-4 bottom-4 w-72 bg-gray-900/90 backdrop-blur-sm rounded-xl border border-gray-700 p-4 overflow-y-auto">
        <h3 className="text-sm font-medium mb-3">Active Deliveries</h3>
        <div className="space-y-2">
          {activeOrders.map(o => (
            <div key={o.id} className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{o.customerName}</span>
                <span className="text-xs text-teal-400">{o.eta} min</span>
              </div>
              <p className="text-xs text-gray-400">{o.items}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                <Package className="w-3 h-3" />
                <span>{o.weight}kg</span>
                <span>|</span>
                <span>{o.distance}km</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
