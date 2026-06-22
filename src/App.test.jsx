import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App.jsx";
import { ToastProvider } from "@/components/ui/index.js";

function renderApp() {
  return render(
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}

describe("THE FORGE // NEXUS", () => {
  it("renders the cinematic entry and the main product shell", () => {
    renderApp();

    expect(screen.getByRole("button", { name: "Entrar no Universo" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /THE FORGE \/\/ NEXUS/i })).toBeInTheDocument();
    expect(screen.getAllByText("Training Core").length).toBeGreaterThan(0);
  });
});
