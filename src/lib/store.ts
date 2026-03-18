import { create } from 'zustand'

export interface DeliveryDrone {
  id: string; name: string; status: 'delivering' | 'returning' | 'idle' | 'charging' | 'maintenance'
  lat: number; lng: number; battery: number; speed: number; payload: number; maxPayload: number
  currentOrder: string | null
}

export interface Order {
  id: string; customerName: string; address: string; items: string
  status: 'pending' | 'preparing' | 'dispatched' | 'in_flight' | 'delivered' | 'cancelled'
  droneId: string | null; weight: number; eta: number | null; distance: number
  pickupLat: number; pickupLng: number; dropoffLat: number; dropoffLng: number
  timestamp: string; priority: 'standard' | 'express' | 'urgent'
}

export interface WeatherAlert {
  id: string; type: 'wind' | 'rain' | 'storm' | 'fog' | 'heat'
  severity: 'advisory' | 'warning' | 'critical'
  message: string; affectedZones: string[]; active: boolean
}

const drones: DeliveryDrone[] = Array.from({ length: 16 }, (_, i) => ({
  id: `dw-${i + 1}`, name: `Wing-${String(i + 1).padStart(3, '0')}`,
  status: (['delivering', 'returning', 'idle', 'charging', 'maintenance'] as const)[i % 5],
  lat: 37.77 + (Math.random() - 0.5) * 0.06, lng: -122.42 + (Math.random() - 0.5) * 0.06,
  battery: 25 + Math.random() * 75, speed: 20 + Math.random() * 40, payload: Math.random() * 2.5,
  maxPayload: 2.5, currentOrder: i % 3 === 0 ? `ord-${i + 1}` : null,
}))

const orders: Order[] = [
  { id: 'ord-1', customerName: 'Sarah Chen', address: '123 Mission St', items: 'Coffee & Pastries', status: 'in_flight', droneId: 'dw-1', weight: 1.2, eta: 8, distance: 3.2, pickupLat: 37.78, pickupLng: -122.41, dropoffLat: 37.77, dropoffLng: -122.43, timestamp: new Date().toISOString(), priority: 'express' },
  { id: 'ord-2', customerName: 'Mike Johnson', address: '456 Market St', items: 'Medication', status: 'dispatched', droneId: 'dw-4', weight: 0.3, eta: 12, distance: 4.5, pickupLat: 37.79, pickupLng: -122.40, dropoffLat: 37.76, dropoffLng: -122.42, timestamp: new Date().toISOString(), priority: 'urgent' },
  { id: 'ord-3', customerName: 'Emma Davis', address: '789 Valencia St', items: 'Sushi Box', status: 'preparing', droneId: null, weight: 1.8, eta: null, distance: 2.1, pickupLat: 37.77, pickupLng: -122.42, dropoffLat: 37.76, dropoffLng: -122.41, timestamp: new Date().toISOString(), priority: 'standard' },
  { id: 'ord-4', customerName: 'Alex Park', address: '321 Hayes St', items: 'Electronics', status: 'pending', droneId: null, weight: 2.0, eta: null, distance: 3.8, pickupLat: 37.78, pickupLng: -122.43, dropoffLat: 37.775, dropoffLng: -122.425, timestamp: new Date().toISOString(), priority: 'standard' },
  { id: 'ord-5', customerName: 'Lisa Wong', address: '555 Fillmore St', items: 'Groceries', status: 'delivered', droneId: 'dw-7', weight: 2.3, eta: 0, distance: 2.7, pickupLat: 37.77, pickupLng: -122.43, dropoffLat: 37.78, dropoffLng: -122.44, timestamp: new Date(Date.now() - 1800000).toISOString(), priority: 'express' },
  { id: 'ord-6', customerName: 'Tom Brown', address: '888 Geary St', items: 'Documents', status: 'in_flight', droneId: 'dw-10', weight: 0.2, eta: 5, distance: 1.5, pickupLat: 37.785, pickupLng: -122.415, dropoffLat: 37.79, dropoffLng: -122.42, timestamp: new Date().toISOString(), priority: 'urgent' },
  { id: 'ord-7', customerName: 'Jane Smith', address: '100 Castro St', items: 'Flowers', status: 'preparing', droneId: null, weight: 0.8, eta: null, distance: 3.0, pickupLat: 37.775, pickupLng: -122.43, dropoffLat: 37.76, dropoffLng: -122.435, timestamp: new Date().toISOString(), priority: 'express' },
  { id: 'ord-8', customerName: 'Bob Lee', address: '200 Divisadero', items: 'Pizza', status: 'delivered', droneId: 'dw-13', weight: 1.5, eta: 0, distance: 2.2, pickupLat: 37.78, pickupLng: -122.42, dropoffLat: 37.775, dropoffLng: -122.44, timestamp: new Date(Date.now() - 3600000).toISOString(), priority: 'standard' },
]

const weatherAlerts: WeatherAlert[] = [
  { id: 'wa-1', type: 'wind', severity: 'advisory', message: 'Moderate winds 15-20 mph expected in downtown area', affectedZones: ['Downtown', 'SOMA'], active: true },
  { id: 'wa-2', type: 'fog', severity: 'warning', message: 'Dense fog advisory for coastal zones until 10 AM', affectedZones: ['Marina', 'Sunset'], active: true },
]

interface AppState {
  activeTab: string; drones: DeliveryDrone[]; orders: Order[]; weatherAlerts: WeatherAlert[]
  setActiveTab: (t: string) => void
}

export const useStore = create<AppState>((set) => ({
  activeTab: 'deliveryMap', drones, orders, weatherAlerts,
  setActiveTab: (t) => set({ activeTab: t }),
}))
