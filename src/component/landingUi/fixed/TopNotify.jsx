import Link from 'next/link'
import React from 'react'

export default function TopNotify() {
  // Array containing multiple notice details
  const notices = [
    {
      text: "We provide the best education in Assam. Admission open for 2026-27!",
      linkText: "Join now",
      linkHref: "/join",
    },
    {
      text: "Get up to 50% scholarship on early registration for all online courses.",
      linkText: "Apply Scholarship",
      linkHref: "/scholarship",
    },
    {
      text: "New batch for Competitive Exams starting from next Monday.",
      linkText: "View Schedule",
      linkHref: "/schedule",
    },
    {
      text: "Free career counseling session available for all interested students.",
      linkText: "Book Slot",
      linkHref: "/counseling",
    },
  ]

  return (
    <div className="w-full flex justify-center items-center bg-black border-b border-gray-800 sticky">
      {/* Injecting pure CSS keyframe animation for instant infinite scrolling */}
      <style>{`
        @keyframes scroll-infinite {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .running-notice-container {
          display: flex;
          width: max-content;
          animation: scroll-infinite 60s linear infinite;
        }
        .running-notice-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full max-w-[1200px] overflow-hidden py-1.5 text-white text-[12px] relative">
        {/* Infinite Running Marquee Wrapper */}
        <div className="running-notice-container">
          
          {/* First Duplicate of Notice Items */}
          <div className="flex items-center space-x-8 pr-8">
            {notices.map((notice, index) => (
              <p key={`notice-1-${index}`} className="flex items-center whitespace-nowrap gap-2">
                <span>{notice.text}</span>
                <Link href={notice.linkHref} className="underline text-yellow-400 hover:text-yellow-300 font-medium">
                  {notice.linkText}
                </Link>
                <span className="ml-6 text-gray-500">•</span>
              </p>
            ))}
          </div>

          {/* Second Duplicate of Notice Items for Seamless Infinite Animation */}
          <div className="flex items-center space-x-8 pr-8" aria-hidden="true">
            {notices.map((notice, index) => (
              <p key={`notice-2-${index}`} className="flex items-center whitespace-nowrap gap-2">
                <span>{notice.text}</span>
                <Link href={notice.linkHref} className="underline text-yellow-400 hover:text-yellow-300 font-medium">
                  {notice.linkText}
                </Link>
                <span className="ml-6 text-gray-500">•</span>
              </p>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}