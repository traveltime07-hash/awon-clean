import React, { useState } from "react";
import { ErrorBoundary } from "./shared/ErrorBoundary";
import { Router } from "./pages/router";

export function App() {
  // Tu później podepniemy AuthContext i feature-flagi
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
}
