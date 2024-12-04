import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  HeartHandshake,
  LogOut,
  DollarSign,
  ShoppingBag,
  Calendar,
  Award,
  PieChart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const adminNavigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Donors', href: '/admin/donors', icon: Users },
  { name: 'Campaigns', href: '/admin/campaigns', icon: HeartHandshake },
  { name: 'Analytics', href: '/admin/analytics', icon: PieChart },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const userNavigation = [
  { name: 'Dashboard', href: '/user/dashboard', icon: LayoutDashboard },
  { name: 'Donate', href: '/user/donate', icon: DollarSign },
  { name: 'Campaigns', href: '/user/campaigns', icon: HeartHandshake },
  { name: 'Shop', href: '/user/shop', icon: ShoppingBag },
  { name: 'Events', href: '/user/events', icon: Calendar },
  { name: 'Merit Badges', href: '/user/merit-badges', icon: Award },
  { name: 'Settings', href: '/user/settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = user?.role === 'admin' ? adminNavigation : userNavigation;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-dark-800/50 backdrop-blur-lg border-r border-dark-700 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <img
            className="h-12 w-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/BSA_universal_emblem.svg/1200px-BSA_universal_emblem.svg.png"
            alt="Boy Scouts of America"
          />
          <span className="ml-2 text-xl font-semibold text-dark-50">Scout Portal</span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`
                          group flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-medium
                          ${
                            isActive
                              ? 'bg-primary-600/10 text-primary-400'
                              : 'text-dark-100 hover:text-primary-400 hover:bg-dark-800'
                          }
                        `}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 ${
                            isActive ? 'text-primary-400' : 'text-dark-400 group-hover:text-primary-400'
                          }`}
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="mt-auto">
              <button
                onClick={handleLogout}
                className="group -mx-2 flex w-full gap-x-3 rounded-lg p-2 text-sm font-semibold leading-6 text-dark-100 hover:bg-dark-800 hover:text-red-400"
              >
                <LogOut className="h-6 w-6 shrink-0 text-dark-400 group-hover:text-red-400" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}