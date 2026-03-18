'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { ShoppingCart, Search, Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react'

const statusColors = { pending: 'text-gray-400 bg-gray-600/20', preparing: 'text-yellow-400 bg-yellow-600/20', dispatched: 'text-blue-400 bg-blue-600/20', in_flight: 'text-teal-400 bg-teal-600/20', delivered: 'text-green-400 bg-green-600/20', cancelled: 'text-red-400 bg-red-600/20' }
const priorityColors = { standard: 'text-gray-400', express: 'text-yellow-400', urgent: 'text-red-400' }

export default function OrderManagement() {
  const { orders } = useStore()
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false
    if (search && !o.customerName.toLowerCase().includes(search.toLowerCase()) && !o.items.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Order Management</h2>
          <p className="text-gray-400">Track and manage all drone delivery orders</p>
        </div>
        <div className="flex gap-3">
          {['all', 'pending', 'preparing', 'in_flight', 'delivered'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${statusFilter === s ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
              {s === 'all' ? 'All' : s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..."
          className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <Package className="w-6 h-6 text-teal-400 mb-2" />
          <p className="text-2xl font-bold">{orders.length}</p>
          <p className="text-xs text-gray-400">Total Orders</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <Truck className="w-6 h-6 text-blue-400 mb-2" />
          <p className="text-2xl font-bold">{orders.filter(o => ['dispatched', 'in_flight'].includes(o.status)).length}</p>
          <p className="text-xs text-gray-400">In Transit</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
          <p className="text-2xl font-bold">{orders.filter(o => o.status === 'delivered').length}</p>
          <p className="text-xs text-gray-400">Delivered</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <Clock className="w-6 h-6 text-yellow-400 mb-2" />
          <p className="text-2xl font-bold">{orders.filter(o => o.eta && o.eta > 0).reduce((s, o) => s + (o.eta || 0), 0) / Math.max(1, orders.filter(o => o.eta && o.eta > 0).length).toFixed(0)}</p>
          <p className="text-xs text-gray-400">Avg ETA (min)</p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Order</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Customer</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Items</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Priority</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Weight</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">ETA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map(o => (
              <tr key={o.id} className="hover:bg-gray-800/50">
                <td className="px-4 py-3 text-sm font-medium">{o.id}</td>
                <td className="px-4 py-3 text-sm">{o.customerName}</td>
                <td className="px-4 py-3 text-sm text-gray-400">{o.items}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[o.status]}`}>{o.status.replace('_', ' ')}</span></td>
                <td className="px-4 py-3"><span className={`text-xs capitalize ${priorityColors[o.priority]}`}>{o.priority}</span></td>
                <td className="px-4 py-3 text-sm">{o.weight}kg</td>
                <td className="px-4 py-3 text-sm">{o.eta ? `${o.eta} min` : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
