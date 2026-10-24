"use client"
import React, { useState } from 'react';
import { Check, Copy, ArrowRight, Download, Calendar, Mail, FileText, ExternalLink } from 'lucide-react';
import { DateTime } from 'luxon';
import Link from 'next/link';

export default function AdmissionSuccess({data,crData,resData}) {

    if(!data || !crData){
        return
    }
  const [copied, setCopied] = useState(false);

  const admissionData = {
    admissionId: data?.admission_id,
    studentName: crData?.name,
    course: `${resData[0]?.class}th - ${resData.section}`,
    batch: resData[0]?.ac_year,
    dateSubmitted: data?.payment_date,
    paymentStatus: data?.payment_ammount,
    amountPaid: data?.payment_ammount,
    receiptNo: data?.payment_id
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(admissionData.admissionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen  text-neutral-900 font-sans flex items-center justify-center p-4 selection:bg-black selection:text-white">
      {/* Container capped strictly at 800px width */}
      <div className="w-full  border border-neutral-300 bg-white p-6 sm:p-8 shadow-sm relative">
        
        {/* Top Decorative Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-black"></div>

        {/* Header Section */}
        <div className="space-y-4 pb-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-600 border border-neutral-300 bg-neutral-50 px-2.5 py-1 uppercase tracking-wider">
              {DateTime.fromISO(admissionData.dateSubmitted).year}
            </span>
          </div>
        </div>

        {/* Admission ID Box (Hero Highlight) */}
        <div className="my-6 bg-neutral-50 border border-neutral-300 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-mono block mb-0.5">
              Official Admission ID
            </span>
            <span className="text-xl sm:text-2xl font-mono font-bold tracking-wider text-black">
              {admissionData.admissionId}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-2.5 bg-black text-white hover:bg-neutral-800 transition-colors flex items-center justify-center space-x-2 text-xs uppercase tracking-wider font-semibold active:translate-y-0.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-6 border-b border-neutral-200">
          <div className="space-y-0.5">
            <span className="text-[11px] uppercase font-mono text-neutral-500 tracking-wider">Class</span>
            <p className="text-xs sm:text-sm font-semibold text-neutral-900">{admissionData.course}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] uppercase font-mono text-neutral-500 tracking-wider">Academic Year</span>
            <p className="text-xs sm:text-sm font-semibold text-neutral-900">{admissionData.batch}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] uppercase font-mono text-neutral-500 tracking-wider">Transaction Status</span>
            <p className="text-xs sm:text-sm font-mono text-emerald-700 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-600 inline-block"></span>
              {admissionData.paymentStatus ? "Success": "Pending"}
            </p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] uppercase font-mono text-neutral-500 tracking-wider">Amount Paid</span>
            <p className="text-xs sm:text-sm font-mono text-neutral-900 font-medium">
              {admissionData.amountPaid} <span className="text-[11px] text-neutral-500 font-normal">({admissionData.receiptNo})</span>
            </p>
          </div>
        </div>

        {/* Next Steps Checklist */}
        <div className="py-6 space-y-3">
          <h3 className="text-[11px] uppercase tracking-[0.2em] font-mono font-semibold text-neutral-500">Next Steps</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 border border-neutral-200 bg-neutral-50/50 flex items-start space-x-3">
              <Mail className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <p className="text-neutral-900 font-semibold">Say Please check Email there Student </p>
                <p className="text-neutral-600 leading-snug">we are send student login credenstial all in student email and say thaks for admission our school</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button className="w-full sm:w-auto px-5 py-2.5 border border-neutral-300 text-neutral-700 hover:text-black hover:border-neutral-500 transition-colors flex items-center justify-center space-x-2 text-xs uppercase tracking-wider font-mono font-medium">
            <Download className="w-3.5 h-3.5" />
            <span>Download Receipt PDF</span>
          </button>
          
          <Link href="/auth/student" className="w-full sm:w-auto px-5 py-2.5 bg-black text-white hover:bg-neutral-800 transition-colors flex items-center justify-center space-x-2 text-xs uppercase tracking-wider font-semibold group">
            <span>Go to Student Portal</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-4 border-t border-neutral-200 text-center sm:text-left text-[11px] font-mono text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>OMG School • ADMISSION CONFIRMATION</span>
          <a href="#" className="hover:text-black flex items-center gap-1 font-medium">
            Need Support? <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
}