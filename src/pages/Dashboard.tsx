import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, Award, Calendar } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const data = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 2000 },
  { name: 'Apr', amount: 2780 },
  { name: 'May', amount: 1890 },
  { name: 'Jun', amount: 2390 },
];

const stats = [
  {
    name: 'Total Donations',
    value: '$89,521',
    icon: DollarSign,
    change: '+14.5%',
    changeType: 'positive',
  },
  {
    name: 'Active Scouts',
    value: '247',
    icon: Users,
    change: '+5.2%',
    changeType: 'positive',
  },
  {
    name: 'Merit Badges Earned',
    value: '1,285',
    icon: Award,
    change: '+12.3%',
    changeType: 'positive',
  },
  {
    name: 'Upcoming Events',
    value: '8',
    icon: Calendar,
    change: '+2',
    changeType: 'positive',
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Summer Camp 2024',
    date: 'July 15-22, 2024',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Annual summer camp at Camp Crystal Lake',
  },
  {
    id: 2,
    title: 'Eagle Scout Ceremony',
    date: 'June 1, 2024',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Celebration of our newest Eagle Scouts',
  },
  {
    id: 3,
    title: 'Community Service Day',
    date: 'May 15, 2024',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Local park cleanup and conservation project',
  },
];

export default function Dashboard() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Fundraising Overview
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Upcoming Events
          </h3>
          <Slider {...sliderSettings}>
            {upcomingEvents.map((event) => (
              <div key={event.id} className="px-2">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h4 className="text-white text-xl font-bold">{event.title}</h4>
                    <p className="text-white text-sm">{event.date}</p>
                    <p className="text-gray-200 text-sm mt-1">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}