/**
 * Simple logger utility for error tracking and debugging
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
  url?: string;
}

class Logger {
  private formatMessage(level: LogLevel, message: string, data?: unknown): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      url: typeof window !== "undefined" ? window.location.href : undefined,
    };
  }

  private log(level: LogLevel, message: string, data?: unknown) {
    const entry = this.formatMessage(level, message, data);

    // In development, log to console with colors
    if (process.env.NODE_ENV === "development") {
      const styles = {
        info: "color: #3b82f6",
        warn: "color: #f59e0b",
        error: "color: #ef4444",
        debug: "color: #8b5cf6",
      };

      console.log(
        `%c[${level.toUpperCase()}] ${entry.timestamp}`,
        styles[level],
        message,
        data || ""
      );
    }

    // In production, you could send to error tracking service
    // Example: Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === "production" && level === "error") {
      // TODO: Send to error tracking service
      // Example: Sentry.captureException(new Error(message), { extra: data });
    }
  }

  info(message: string, data?: unknown) {
    this.log("info", message, data);
  }

  warn(message: string, data?: unknown) {
    this.log("warn", message, data);
  }

  error(message: string, data?: unknown) {
    this.log("error", message, data);
  }

  debug(message: string, data?: unknown) {
    if (process.env.NODE_ENV === "development") {
      this.log("debug", message, data);
    }
  }
}

export const logger = new Logger();

