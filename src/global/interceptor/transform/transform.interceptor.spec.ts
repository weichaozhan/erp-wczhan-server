import { Reflector } from '@nestjs/core';
import { TransformInterceptor } from './transform.interceptor';

describe('TransformInterceptor', () => {
  it('should be defined', () => {
    const mockReflector = {} as Reflector; // Provide a mock Reflector
    expect(new TransformInterceptor(mockReflector)).toBeDefined();
  });
});
