'use client'

import { useStore } from '@/lib/store'
import { Package, MapPin, ShoppingCart, Route, Users, Cloud, Plane } from 'lucide-react'
import DeliveryMap from '@/components/DeliveryMap'
import OrderManagement from '@/components/OrderManagement'
import RouteOptimizer from '@/components/RouteOptimizer'
import CustomerTracking from '@/components/CustomerTracking'
import WeatherPanel from '@/components/WeatherPanel'
import FleetStatus from '@/components/FleetStatus'

const tabs = [
  { id: 'deliveryMap', label: 'Delivery Map', icon: MapPin },
  { id: 'orders', label: 'Order Management', icon: ShoppingCart },
  { id: 'routes', label: 'Route Optimizer', icon: Route },
  { id: 'tracking', label: 'Customer Tracking', icon: Users },
  { id: 'weather', label: 'Weather Integration', icon: Cloud },
  { id: 'fleet', label: 'Fleet Status', icon: Plane },
]

export default function HomePage() {
  const { activeTab, setActiveTab, drones, orders } = useStore()
  const activeDeliveries = orders.filter(o => ['dispatched', 'in_flight'].includes(o.status)).length

  const render = () => {
    switch (activeTab) {
      case 'deliveryMap': return <DeliveryMap />
      case 'orders': return <OrderManagement />
      case 'routes': return <RouteOptimizer />
      case 'tracking': return <CustomerTracking />
      case 'weather': return <WeatherPanel />
      case 'fleet': return <FleetStatus />
      default: return <DeliveryMap />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">DeliverWing</h1>
              <p className="text-xs text-gray-400">Drone Delivery</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-teal-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}>
              <tab.icon className="w-5 h-5" /> {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800 space-y-2">
          <div className="bg-gray-800 rounded-xl p-3">
            <p className="text-xs text-gray-400">Active Deliveries</p>
            <p className="text-xl font-bold text-teal-400">{activeDeliveries}</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-3">
            <p className="text-xs text-gray-400">Fleet</p>
            <p className="text-sm font-bold">{drones.length} drones | {drones.filter(d => d.status === 'delivering').length} flying</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{render()}</main>
    </div>
  )
}
