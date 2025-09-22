// Purpose: Request logging middleware for the VEED Video Library Dashboard API
import { Request, Response, NextFunction } from 'express';

export interface LogData {
  method: string;
  url: string;
  statusCode?: number;
  responseTime?: number;
  userAgent?: string;
  ip?: string;
  timestamp: string;
}

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  // Log request start
  console.log(`[${timestamp}] ${req.method} ${req.url} - Started`);

  // Override res.end to log response
  const originalEnd = res.end.bind(res);
  res.end = function(chunk?: any, encoding?: any, callback?: any) {
    const responseTime = Date.now() - startTime;
    
    const logData: LogData = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseTime,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress,
      timestamp
    };

    // Log response
    const logLevel = res.statusCode >= 400 ? 'ERROR' : 'INFO';
    console.log(
      `[${timestamp}] ${logLevel} ${req.method} ${req.url} - ${res.statusCode} - ${responseTime}ms`
    );

    // Call original end method
    return originalEnd(chunk, encoding, callback);
  };

  next();
};

// Health check logger (lighter logging for health checks)
export const healthCheckLogger = (req: Request, res: Response, next: NextFunction): void => {
  if (req.path === '/health' || req.path === '/api/health') {
    // Skip detailed logging for health checks
    return next();
  }
  
  requestLogger(req, res, next);
};
