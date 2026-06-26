"use client";

import { LoginForm } from "@/components/auth/login-form";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Panel - Branding & Animation */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-zinc-950 flex-col items-center justify-center p-12">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/40 blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-600/30 blur-[100px]"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-lg space-y-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-zinc-950 font-bold text-xl">
                P
              </div>
              <span className="text-3xl font-bold tracking-tight">ProManage</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
              Streamline your workflow with precision.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Experience the next generation of project management. Built for enterprise, designed for you.
            </p>
          </motion.div>
          

        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Mobile blobs */}
        <div className="absolute inset-0 z-0 lg:hidden overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[80px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-12">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              P
            </div>
            <span className="text-2xl font-bold tracking-tight">ProManage</span>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
