import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SupremeDisciplineApp from "@/SupremeDisciplineApp.jsx";
import { ToastProvider } from "@/components/ui/index.js";

function renderApp() {
  return render(
    <ToastProvider>
      <SupremeDisciplineApp />
    </ToastProvider>
  );
}

describe("Disciplina Suprema", () => {
  it("renders the zeroed player dashboard", () => {
    renderApp();

    expect(screen.getByRole("heading", { name: "Recruta da Forja" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Concluir treino do dia" })).toBeInTheDocument();
    expect(screen.getByText("2/10")).toBeInTheDocument();
  });
});
