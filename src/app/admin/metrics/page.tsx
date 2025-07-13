"use client";

import { useState, useEffect } from "react";

interface ReadingStat {
  user: string;
  chaptersRead: number;
  timeSpent: string;
  lastActive: string;
}

interface PopularChapter {
  title: string;
  views: number;
  avgTime: string;
}

interface EngagementMetric {
  metric: string;
  value: string;
}

interface MetricsData {
  totalReaders: number;
  activeReaders: number;
  readingStats: ReadingStat[];
  popularChapters: PopularChapter[];
  readerEngagement: EngagementMetric[];
}

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<MetricsData>({
    totalReaders: 0,
    activeReaders: 0,
    readingStats: [],
    popularChapters: [],
    readerEngagement: []
  });

  useEffect(() => {
    // Mock metrics data - in a real app, this would come from analytics API
    setMetrics({
      totalReaders: 156,
      activeReaders: 42,
      readingStats: [
        { user: "reader1@example.com", chaptersRead: 15, timeSpent: "4h 32m", lastActive: "2 hours ago" },
        { user: "reader2@example.com", chaptersRead: 12, timeSpent: "3h 18m", lastActive: "1 day ago" },
        { user: "bookfan@example.com", chaptersRead: 8, timeSpent: "2h 45m", lastActive: "3 hours ago" },
        { user: "medievallover@example.com", chaptersRead: 20, timeSpent: "6h 12m", lastActive: "30 minutes ago" },
        { user: "sagareader@example.com", chaptersRead: 7, timeSpent: "1h 58m", lastActive: "5 hours ago" },
      ],
      popularChapters: [
        { title: "Crown Of Thorns - Chapter 1", views: 89, avgTime: "12m 34s" },
        { title: "Crown Of Thorns - Chapter 2", views: 76, avgTime: "11m 18s" },
        { title: "The Blood Tides - Chapter 1", views: 65, avgTime: "13m 45s" },
        { title: "Kingmaker - Chapter 1", views: 52, avgTime: "14m 22s" },
        { title: "The Blood Tides - Chapter 2", views: 48, avgTime: "10m 56s" },
      ],
      readerEngagement: [
        { metric: "Average Session Time", value: "28 minutes" },
        { metric: "Chapters per Session", value: "2.3" },
        { metric: "Return Rate", value: "73%" },
        { metric: "Comment Rate", value: "15%" },
        { metric: "Rating Rate", value: "22%" },
      ]
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-unifraktur-cook text-amber-300 mb-8 text-center">Reader Analytics & Metrics</h1>
      
      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30">
          <h3 className="text-lg font-medieval-sharp text-amber-300 mb-2">Total Readers</h3>
          <p className="text-3xl font-bold text-white">{metrics.totalReaders}</p>
        </div>
        <div className="bg-gradient-to-br from-green-900/20 to-gray-900/50 p-6 rounded-lg border border-green-600/30">
          <h3 className="text-lg font-medieval-sharp text-green-300 mb-2">Active Today</h3>
          <p className="text-3xl font-bold text-white">{metrics.activeReaders}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-900/20 to-gray-900/50 p-6 rounded-lg border border-blue-600/30">
          <h3 className="text-lg font-medieval-sharp text-blue-300 mb-2">Avg Session</h3>
          <p className="text-3xl font-bold text-white">28m</p>
        </div>
        <div className="bg-gradient-to-br from-purple-900/20 to-gray-900/50 p-6 rounded-lg border border-purple-600/30">
          <h3 className="text-lg font-medieval-sharp text-purple-300 mb-2">Engagement</h3>
          <p className="text-3xl font-bold text-white">73%</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Readers */}
        <section className="bg-gradient-to-b from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30">
          <h2 className="text-2xl font-medieval-sharp text-amber-300 mb-6">Most Active Readers</h2>
          <div className="space-y-4">
            {metrics.readingStats.map((reader, index) => (
              <div key={index} className="bg-gray-800/50 p-4 rounded border border-gray-700/50">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-amber-200">{reader.user}</p>
                  <span className="text-xs text-gray-400">{reader.lastActive}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Chapters Read:</span>
                    <span className="text-white ml-2 font-semibold">{reader.chaptersRead}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Time Spent:</span>
                    <span className="text-white ml-2 font-semibold">{reader.timeSpent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Chapters */}
        <section className="bg-gradient-to-b from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30">
          <h2 className="text-2xl font-medieval-sharp text-amber-300 mb-6">Most Popular Chapters</h2>
          <div className="space-y-4">
            {metrics.popularChapters.map((chapter, index) => (
              <div key={index} className="bg-gray-800/50 p-4 rounded border border-gray-700/50">
                <p className="font-semibold text-amber-200 mb-2">{chapter.title}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Views:</span>
                    <span className="text-white ml-2 font-semibold">{chapter.views}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Avg Time:</span>
                    <span className="text-white ml-2 font-semibold">{chapter.avgTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Engagement Metrics */}
      <section className="mt-8 bg-gradient-to-r from-amber-900/20 to-gray-900/50 p-6 rounded-lg border border-amber-600/30">
        <h2 className="text-2xl font-medieval-sharp text-amber-300 mb-6">Reader Engagement</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {metrics.readerEngagement.map((metric, index) => (
            <div key={index} className="bg-gray-800/50 p-4 rounded text-center">
              <p className="text-sm text-gray-400 mb-1">{metric.metric}</p>
              <p className="text-xl font-bold text-amber-300">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Admin */}
      <div className="mt-8 text-center">
        <a 
          href="/admin" 
          className="inline-block bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded font-medieval-sharp transition"
        >
          ← Back to Admin Panel
        </a>
      </div>
    </div>
  );
}
