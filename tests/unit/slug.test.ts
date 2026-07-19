import { describe, it, expect } from 'vitest';
import { slugRegex } from '../../src/schemas/content';

describe('slugSchema regex（规范 §10.2）', () => {
  it('接受合法 slug（英文小写 + 连字符）', () => {
    expect(slugRegex.test('schema-driven-agent-design')).toBe(true);
    expect(slugRegex.test('frontend-handbook')).toBe(true);
    expect(slugRegex.test('a')).toBe(true);
    expect(slugRegex.test('a1-b2-c3')).toBe(true);
  });

  it('拒绝非法 slug', () => {
    expect(slugRegex.test('Schema-Driven')).toBe(false); // 大写
    expect(slugRegex.test('schema_driven')).toBe(false); // 下划线
    expect(slugRegex.test('-leading')).toBe(false); // 前导连字符
    expect(slugRegex.test('trailing-')).toBe(false); // 结尾连字符
    expect(slugRegex.test('double--dash')).toBe(false); // 连续连字符
    expect(slugRegex.test('')).toBe(false); // 空
    expect(slugRegex.test('has space')).toBe(false); // 空格
  });
});
