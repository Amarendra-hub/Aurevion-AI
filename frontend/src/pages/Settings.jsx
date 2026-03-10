import { motion } from 'framer-motion'
import { Settings, Bell, Lock, Palette, LogOut } from 'lucide-react'

export default function SettingsPage() {
  return (
    <main className="pt-20 min-h-screen pb-20">
      <section className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-8 h-8 text-indigo-400" />
            <h1 className="text-4xl font-bold">Settings</h1>
          </div>
          <p className="text-slate-400">Manage your account preferences and settings</p>
        </motion.div>

        <div className="space-y-6">
          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass p-6 rounded-xl border border-slate-700"
          >
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="input-field w-full"
                  placeholder="user@example.com"
                  defaultValue="user@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="input-field w-full"
                  placeholder="Your name"
                  defaultValue="John Doe"
                />
              </div>

              <button className="btn-primary">Save Changes</button>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-6 rounded-xl border border-slate-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Email Notifications</p>
                  <p className="text-sm text-slate-400">Receive updates via email</p>
                </div>
                <div className="w-14 h-8 bg-indigo-600 rounded-full relative">
                  <div className="w-6 h-6 bg-white rounded-full absolute top-1 right-1" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Generation Alerts</p>
                  <p className="text-sm text-slate-400">Notify when generation completes</p>
                </div>
                <div className="w-14 h-8 bg-slate-600 rounded-full relative">
                  <div className="w-6 h-6 bg-white rounded-full absolute top-1 left-1" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass p-6 rounded-xl border border-slate-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold">Security</h2>
            </div>

            <div className="space-y-4">
              <button className="btn-outline w-full text-left">
                Change Password
              </button>
              <button className="btn-outline w-full text-left">
                Enable Two-Factor Authentication
              </button>
              <button className="btn-outline w-full text-left">
                View Active Sessions
              </button>
            </div>
          </motion.div>

          {/* Appearance Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass p-6 rounded-xl border border-slate-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">Appearance</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-white mb-3">Theme</p>
                <div className="flex gap-4">
                  <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium">
                    Dark
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors">
                    Light
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass p-6 rounded-xl border border-red-700 border-opacity-50"
          >
            <h2 className="text-2xl font-bold text-red-400 mb-6">Danger Zone</h2>

            <div className="space-y-4">
              <button className="btn-outline w-full text-red-400 border-red-400 hover:bg-red-900 hover:bg-opacity-20 flex items-center gap-2 justify-center">
                <LogOut size={18} />
                Sign Out
              </button>
              <button className="btn-outline w-full text-red-400 border-red-400 hover:bg-red-900 hover:bg-opacity-20">
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
