import React from 'react';
// import { 
//   MapPin, 
//   Phone, 
//   Mail, 
//   Facebook, 
//   Instagram, 
//   Youtube, 
//   Twitter, 
//   Heart 
// } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white border-t border-zinc-800">
      {/* Main Footer Container */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight uppercase text-white">
                Baby's Nursery School
              </h2>
              <p className="text-xs text-zinc-400 font-light mt-1 uppercase tracking-wider">
                Best Learning School In Kokrajhar, Assam
              </p>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              Nurturing young minds with care, creative learning, and a supportive environment for early childhood development.
            </p>
            {/* Social Icons */}
            {/* <div className="flex items-center space-x-3 pt-2">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Youtube, href: '#' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white hover:border-white hover:text-black transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div> */}
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-400 font-light">
              {['About Us', 'Academics & Curriculum', 'Admissions', 'Gallery & Events', 'Contact Us'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Classes / Programs */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">
              Programs
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-400 font-light">
              {['Playgroup', 'Nursery', 'Lower KG (LKG)', 'Upper KG (UKG)', 'Activity Center'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Address & Contact Info */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">
              Visit & Contact Us
            </h3>
            <div className="space-y-3 text-sm text-zinc-400 font-light">
              <div className="flex items-start space-x-3">
                {/* <MapPin size={18} className="text-white mt-0.5 shrink-0" /> */}
                <span>Saralpara, Kokrajhar, Assam, India</span>
              </div>
              <div className="flex items-center space-x-3">
                {/* <Phone size={18} className="text-white shrink-0" /> */}
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                {/* <Mail size={18} className="text-white shrink-0" /> */}
                <span>info@babysnursery.edu.in</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-light gap-4">
          <p>© {new Date().getFullYear()} Baby's Nursery School. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}