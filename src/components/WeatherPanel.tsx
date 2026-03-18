'use client'

import { useStore } from '@/lib/store'
import { Cloud, Wind, CloudFog, CloudLightning, Sun, AlertTriangle, CheckCircle } from 'lucide-react'

const typeIcons: Record<string, any> = { wind: Wind, rain: Cloud, storm: CloudLightning, fog: CloudFog, heat: Sun }
const severityColors = { advisory: 'text-yellow-400 bg-yellow-600/20', warning: 'text-orange-400 bg-orange-600/20', critical: 'text-red-400 bg-red-600/20' }

export default function WeatherPanel() {
  const { weatherAlerts } = useStore()

  const conditions = {
    temperature: 68, humidity: 55, windSpeed: 14, windDirection: 'NW',
    visibility: 8, pressure: 1013, cloudCover: 40, precipitation: 0,
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Weather Integration</h2>
        <p className="text-gray-400">Real-time weather conditions and flight advisories</p>
      </div>

      {/* Current conditions */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Temperature', value: `${conditions.temperature}F`, icon: Sun, color: '#f59e0b' },
          { label: 'Wind', value: `${conditions.windSpeed} mph ${conditions.windDirection}`, icon: Wind, color: '#06b6d4' },
          { label: 'Visibility', value: `${conditions.visibility} mi`, icon: Cloud, color: '#8b5cf6' },
          { label: 'Cloud Cover', value: `${conditions.cloudCover}%`, icon: Cloud, color: '#6b7280' },
        ].map(c => (
          <div key={c.label} className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
            <c.icon className="w-6 h-6 mb-2" style={{ color: c.color }} />
            <p className="text-xl font-bold">{c.value}</p>
            <p className="text-xs text-gray-400">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Flight status */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Flight Conditions Assessment</h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: 'Overall', status: 'Favorable', ok: true },
            { label: 'Wind Safety', status: conditions.windSpeed < 20 ? 'Safe' : 'Caution', ok: conditions.windSpeed < 20 },
            { label: 'Visibility', status: conditions.visibility > 5 ? 'Good' : 'Limited', ok: conditions.visibility > 5 },
          ].map(a => (
            <div key={a.label} className="bg-gray-800 rounded-xl p-4 text-center">
              {a.ok ? <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" /> : <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />}
              <p className="font-medium">{a.status}</p>
              <p className="text-xs text-gray-400">{a.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Active Weather Alerts</h3>
        {weatherAlerts.filter(a => a.active).length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <p className="text-gray-400">No active weather alerts</p>
          </div>
        ) : (
          <div className="space-y-3">
            {weatherAlerts.filter(a => a.active).map(alert => {
              const Icon = typeIcons[alert.type] || Cloud
              return (
                <div key={alert.id} className={`rounded-xl p-4 border ${
                  alert.severity === 'critical' ? 'border-red-600/30 bg-red-600/5' :
                  alert.severity === 'warning' ? 'border-orange-600/30 bg-orange-600/5' :
                  'border-yellow-600/30 bg-yellow-600/5'
                }`}>
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 mt-0.5 ${severityColors[alert.severity].split(' ')[0]}`} />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium capitalize">{alert.type} {alert.severity}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${severityColors[alert.severity]}`}>{alert.severity}</span>
                      </div>
                      <p className="text-sm text-gray-300">{alert.message}</p>
                      <div className="flex gap-2 mt-2">
                        {alert.affectedZones.map(z => (
                          <span key={z} className="text-xs bg-gray-800 px-2 py-0.5 rounded">{z}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Wind forecast */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Wind Speed Forecast (24h)</h3>
        <div className="flex items-end gap-1 h-24">
          {Array.from({ length: 24 }, (_, i) => {
            const h = 10 + Math.sin(i * 0.5) * 20 + Math.random() * 15
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="w-full rounded-t-sm" style={{
                  height: `${h}%`,
                  backgroundColor: h > 60 ? '#ef4444' : h > 40 ? '#eab308' : '#22c55e'
                }} />
                {i % 4 === 0 && <span className="text-[8px] text-gray-500 mt-1">{i}h</span>}
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded" />Safe (&lt;15 mph)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-500 rounded" />Caution (15-25 mph)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded" />No-fly (&gt;25 mph)</span>
        </div>
      </div>
    </div>
  )
}
