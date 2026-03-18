'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { Users, Package, Clock, MapPin, CheckCircle, Star, Navigation } from 'lucide-react'

export default function CustomerTracking() {
  const { orders } = useStore()
  const [selectedOrder, setSelectedOrder] = useState(orders.find(o => o.status === 'in_flight') || orders[0])

  const statusSteps = ['pending', 'preparing', 'dispatched', 'in_flight', 'delivered']
  const currentStep = statusSteps.indexOf(selectedOrder.status)

  return (
    <div className="h-full flex items-center justify-center bg-gray-950 p-8">
      <div className="w-[420px] bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-teal-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              <span className="font-bold">DeliverWing Tracking</span>
            </div>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">{selectedOrder.id}</span>
          </div>
        </div>

        {/* Map area */}
        <div className="h-40 bg-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-gray-900/20">
            <svg className="w-full h-full opacity-15">
              {Array.from({ length: 8 }, (_, i) => (
                <line key={i} x1="0" y1={`${i * 12.5}%`} x2="100%" y2={`${i * 12.5}%`} stroke="#14b8a6" strokeWidth="0.5" />
              ))}
            </svg>
          </div>
          {selectedOrder.status === 'in_flight' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-teal-500/30">
                <Navigation className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
          {selectedOrder.status === 'delivered' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-green-400" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Delivering to</p>
              <p className="font-medium">{selectedOrder.customerName}</p>
              <p className="text-xs text-gray-400">{selectedOrder.address}</p>
            </div>
            {selectedOrder.eta && selectedOrder.eta > 0 ? (
              <div className="text-right">
                <p className="text-sm text-gray-400">ETA</p>
                <p className="text-xl font-bold text-teal-400">{selectedOrder.eta} min</p>
              </div>
            ) : selectedOrder.status === 'delivered' ? (
              <span className="text-green-400 text-sm font-medium">Delivered!</span>
            ) : null}
          </div>

          {/* Progress tracker */}
          <div>
            <div className="flex items-center justify-between mb-2">
              {statusSteps.map((step, i) => (
                <div key={step} className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    i <= currentStep ? 'bg-teal-500 text-white' : 'bg-gray-700 text-gray-400'
                  }`}>
                    {i < currentStep ? '\u2713' : i + 1}
                  </div>
                  <span className="text-[9px] text-gray-500 mt-1 capitalize">{step.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div className="bg-teal-500 h-1.5 rounded-full transition-all" style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }} />
            </div>
          </div>

          {/* Order details */}
          <div className="bg-gray-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Items</span>
              <span>{selectedOrder.items}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Weight</span>
              <span>{selectedOrder.weight}kg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Distance</span>
              <span>{selectedOrder.distance}km</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Priority</span>
              <span className={`capitalize ${selectedOrder.priority === 'urgent' ? 'text-red-400' : selectedOrder.priority === 'express' ? 'text-yellow-400' : 'text-gray-300'}`}>{selectedOrder.priority}</span>
            </div>
          </div>

          {selectedOrder.status === 'delivered' && (
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">Rate your delivery</p>
              <div className="flex gap-1 justify-center">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className="w-7 h-7 text-yellow-400 fill-yellow-400 cursor-pointer hover:scale-110 transition-transform" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order selector */}
        <div className="border-t border-gray-800 p-4">
          <p className="text-xs text-gray-400 mb-2">Recent Orders</p>
          <div className="flex gap-2 overflow-x-auto">
            {orders.slice(0, 5).map(o => (
              <button key={o.id} onClick={() => setSelectedOrder(o)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs ${selectedOrder.id === o.id ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
                {o.id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
