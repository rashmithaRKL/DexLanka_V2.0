import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, CheckCircle, XCircle } from 'lucide-react';

interface DownloadProgressProps {
    isOpen: boolean;
    progress: number;
    currentFile?: string;
    totalFiles?: number;
    completedFiles?: number;
    status: 'downloading' | 'success' | 'error';
    errorMessage?: string;
}

export const DownloadProgress: React.FC<DownloadProgressProps> = ({
    isOpen,
    progress,
    currentFile,
    totalFiles = 0,
    completedFiles = 0,
    status,
    errorMessage,
}) => {
    const circumference = 2 * Math.PI * 54; // radius = 54
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Progress Dialog */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8 max-w-md w-full"
                        >
                            {/* Status Icon & Progress Circle */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative w-32 h-32 mb-4">
                                    {/* Background Circle */}
                                    <svg className="w-32 h-32 transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="54"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="none"
                                            className="text-gray-700"
                                        />
                                        {/* Progress Circle */}
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="54"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={strokeDashoffset}
                                            className={`transition-all duration-300 ${status === 'success'
                                                    ? 'text-green-500'
                                                    : status === 'error'
                                                        ? 'text-red-500'
                                                        : 'text-dexRed'
                                                }`}
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                    {/* Center Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {status === 'downloading' && (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                            >
                                                <Download className="w-12 h-12 text-dexRed" />
                                            </motion.div>
                                        )}
                                        {status === 'success' && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                                            >
                                                <CheckCircle className="w-12 h-12 text-green-500" />
                                            </motion.div>
                                        )}
                                        {status === 'error' && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                                            >
                                                <XCircle className="w-12 h-12 text-red-500" />
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {/* Progress Percentage */}
                                <motion.div
                                    key={progress}
                                    initial={{ scale: 1.2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-4xl font-bold text-white mb-2"
                                >
                                    {Math.round(progress)}%
                                </motion.div>

                                {/* Status Text */}
                                <div className="text-center">
                                    {status === 'downloading' && (
                                        <>
                                            <p className="text-lg font-semibold text-white mb-1">
                                                Downloading Templates
                                            </p>
                                            {totalFiles > 0 && (
                                                <p className="text-sm text-gray-400">
                                                    {completedFiles} of {totalFiles} files
                                                </p>
                                            )}
                                        </>
                                    )}
                                    {status === 'success' && (
                                        <p className="text-lg font-semibold text-green-400">
                                            Download Complete!
                                        </p>
                                    )}
                                    {status === 'error' && (
                                        <p className="text-lg font-semibold text-red-400">
                                            Download Failed
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Current File */}
                            {currentFile && status === 'downloading' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                                >
                                    <p className="text-xs text-gray-400 mb-1">Current file:</p>
                                    <p className="text-sm text-white font-mono truncate">
                                        {currentFile}
                                    </p>
                                </motion.div>
                            )}

                            {/* Error Message */}
                            {errorMessage && status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 rounded-lg p-4 border border-red-500/30"
                                >
                                    <p className="text-sm text-red-400">{errorMessage}</p>
                                </motion.div>
                            )}

                            {/* Progress Bar (Linear) */}
                            <div className="mt-6">
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.3 }}
                                        className={`h-full rounded-full ${status === 'success'
                                                ? 'bg-green-500'
                                                : status === 'error'
                                                    ? 'bg-red-500'
                                                    : 'bg-gradient-to-r from-dexRed to-red-600'
                                            }`}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
