"use client"

import { useState } from "react"
import LoginForm from "@/components/LoginForm"
import SignupForm from "@/components/SignupForm"
import { Button } from "@/components/ui/button"

export default function Auth() {
  const [showForm, setShowForm] = useState<"login" | "signup">("login")

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4">
      <div className="w-full max-w-md bg-card rounded-lg shadow-lg border border-border p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">BOOM</h1>
          <p className="text-muted-foreground">Join the conversation</p>
        </div>

        {/* Toggle buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant={showForm === "login" ? "default" : "outline"}
            onClick={() => setShowForm("login")}
            aria-pressed={showForm === "login"}
            className="px-8"
          >
            Login
          </Button>
          <Button
            variant={showForm === "signup" ? "default" : "outline"}
            onClick={() => setShowForm("signup")}
            aria-pressed={showForm === "signup"}
            className="px-8"
          >
            Signup
          </Button>
        </div>

        {/* Forms */}
        <div>
          {showForm === "login" && <LoginForm />}
          {showForm === "signup" && <SignupForm />}
        </div>
      </div>
    </div>
  )
}
