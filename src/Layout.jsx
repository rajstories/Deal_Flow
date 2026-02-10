import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    FileSearch,
    Users2,
    Briefcase,
    BarChart3,
    Settings,
    Kanban,
    Menu,
    X,
    Search,
    Bell,
    Zap,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlobalSearch from '@/components/GlobalSearch';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileSearch, label: 'Deal Analysis', path: '/analysis' },
    { icon: Kanban, label: 'Deal Pipeline', path: '/pipeline' },
    { icon: Users2, label: 'Relationships', path: '/relationships' },
    { icon: Briefcase, label: 'Portfolio', path: '/portfolio' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Layout({ children }) {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const location = useLocation();

    // Mock notifications data
    const notifications = [
        { id: 1, title: 'New deal uploaded', message: 'TechFlow AI pitch deck ready for analysis', time: '2m ago', unread: true },
        { id: 2, title: 'Warm path identified', message: '3 new warm introductions available', time: '1h ago', unread: true },
        { id: 3, title: 'Meeting reminder', message: 'Call with Sarah Chen in 30 minutes', time: '2h ago', unread: false },
    ];

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            setShowSearch(true);
        }
    };

    return (
        <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden font-sans">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex w-[260px] flex-col border-r border-slate-100 bg-white transition-all duration-300 p-6">
                {/* Logo Section */}
                <div className="flex items-center gap-3 px-2">
                    <div className="h-10 w-10 rounded-xl bg-[#0ea5e9] shadow-md flex items-center justify-center">
                        <Zap className="h-6 w-6 text-white fill-white" />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-slate-900">DealFlow</span>
                        <span className="text-xl font-bold text-sky-500">AI</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col gap-2 mt-8">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ease-in-out relative",
                                    isActive
                                        ? "bg-sky-50 text-sky-600"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive ? "text-sky-600" : "text-slate-400 group-hover:text-slate-600")} />
                                {item.label}
                                {isActive && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-500" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Profile Section */}
                <div className="mt-auto pt-6">
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                            P
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">Prince kumar</p>
                            <p className="text-xs text-slate-500 truncate">prince@dealflow.ai</p>
                        </div>
                        <button className="text-slate-400 hover:text-red-500 transition-colors p-1">
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header */}
                <header className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search deals, companies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                onClick={() => setShowSearch(true)}
                                onFocus={() => setShowSearch(true)}
                                className="h-10 w-64 rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <Bell className="h-5 w-5" />
                                {notifications.filter(n => n.unread).length > 0 && (
                                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                                    <div className="p-4 border-b border-slate-200">
                                        <h3 className="font-semibold text-slate-900">Notifications</h3>
                                        <p className="text-xs text-slate-500 mt-0.5">{notifications.filter(n => n.unread).length} unread</p>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.map(notification => (
                                            <button
                                                key={notification.id}
                                                onClick={() => {
                                                    console.log('Notification clicked:', notification);
                                                    setShowNotifications(false);

                                                    // Navigate based on notification type
                                                    if (notification.title.includes('deal')) {
                                                        navigate('/analysis');
                                                    } else if (notification.title.includes('Warm path')) {
                                                        navigate('/relationships');
                                                    } else if (notification.title.includes('Meeting')) {
                                                        navigate('/relationships');
                                                    } else {
                                                        navigate('/');
                                                    }
                                                }}
                                                className={`w-full p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors text-left ${notification.unread ? 'bg-blue-50/50' : ''
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${notification.unread ? 'bg-blue-500' : 'bg-slate-300'
                                                        }`} />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-slate-900">{notification.title}</p>
                                                        <p className="text-xs text-slate-600 mt-0.5">{notification.message}</p>
                                                        <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="p-3 border-t border-slate-200">
                                        <button
                                            onClick={() => {
                                                setShowNotifications(false);
                                                navigate('/settings');
                                            }}
                                            className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            View all notifications
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-medium text-sm">
                            PK
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6">
                    <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Drawer */}
            < AnimatePresence >
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 z-50 w-64 bg-white text-slate-900 shadow-xl md:hidden"
                        >
                            <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-lg bg-[#0ea5e9] flex items-center justify-center">
                                        <Zap className="h-5 w-5 text-white fill-white" />
                                    </div>
                                    <span className="text-lg font-bold">DealFlow</span>
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-slate-400 hover:text-slate-900"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <nav className="p-4 space-y-1">
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                                                isActive
                                                    ? "bg-sky-50 text-sky-600"
                                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                            )}
                                        >
                                            <item.icon className={cn("h-5 w-5", isActive ? "text-sky-600" : "text-slate-400")} />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence >

            {/* Global Search Modal */}
            < GlobalSearch
                open={showSearch}
                onOpenChange={setShowSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
        </div >
    );
}