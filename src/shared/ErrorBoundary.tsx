import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; message?: string };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(err: unknown) { return { hasError: true, message: (err as Error)?.message || "Błąd" }; }
  componentDidCatch(err: unknown, info: unknown) { console.error("[ErrorBoundary]", err, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <div className="card">
            <h1 style={{marginBottom:8}}>Ups — coś poszło nie tak</h1>
            <p style={{marginBottom:12}}>Błąd został złapany, dzięki temu nie ma „białej strony”.</p>
            <code style={{display:"block", padding:12, border:"1px solid #1f2937", borderRadius:12}}>{this.state.message}</code>
            <button className="btn" style={{marginTop:12}} onClick={() => location.reload()}>Odśwież</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
