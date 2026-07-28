/**
 * SchemaX 涂鸦设计系统（Rough.js 引擎）
 *
 * 架构：
 * - presets  —— roughness 档位 / 色角色 / 命名预设（token 化 stroke/fill）
 * - render   —— RoughGenerator 原语 → PathInfo[]（无 DOM，SSR 安全）
 * - marks    —— 命名涂鸦目录（wave / star / icons…）
 *
 * 组件入口：
 * - <Doodle kind="star" />     设计系统命名 mark
 * - <Rough shape="rect" />     低层原语
 */
export {
  doodleColorVar,
  doodlePresets,
  roughOptions,
  roughnessTier,
  type DoodleColor,
  type FillRecipe,
  type RoughnessTier,
  type RoughPresetInput,
} from './presets';

export {
  DOODLE_SEED_BASE,
  childSeed,
  drawableToPaths,
  getGenerator,
  makeMark,
  newSeed,
  roughArc,
  roughCircle,
  roughCurve,
  roughEllipse,
  roughLine,
  roughLinearPath,
  roughPath,
  roughPolygon,
  roughRect,
  type SvgMark,
} from './render';

export {
  doodleMarkKinds,
  getMark,
  type DoodleMarkKind,
  type DoodleSize,
  type GetMarkOptions,
} from './marks';
