import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("App error boundary caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
          <h1 style={{ marginBottom: "1rem" }}>Etwas ist schiefgelaufen</h1>
          <p>Bitte laden Sie die Seite neu.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1.5rem",
              border: "1px solid #ccc",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Seite neu laden
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
