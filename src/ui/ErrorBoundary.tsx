import { Component, type ReactNode } from 'react';

/**
 * Last line of defence: an unexpected error in any screen would otherwise leave
 * an empty page. Progress is autosaved, so reloading brings the player back.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div className="crash-screen">
        <div className="panel">
          <h2 lang="ja">エラーが起きました</h2>
          <p>Something went wrong. Your progress up to the last autosave is safe.</p>
          <button className="btn primary" autoFocus onClick={() => location.reload()}>
            再読み込み Reload
          </button>
          <p className="note">{error.message}</p>
        </div>
      </div>
    );
  }
}
