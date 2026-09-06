// Set modelUrl to '/models/zuhair.glb' when the final avatar is available.
// Model: feet at Y=0, facing +Z, height ~1.9 units. Named clips: Idle, Walk, Interact, Typing.
export const avatarConfig: {
  modelUrl: string | null;
  scale: number;
  rotationOffset: number;
} = { modelUrl: null, scale: 1, rotationOffset: 0 };
