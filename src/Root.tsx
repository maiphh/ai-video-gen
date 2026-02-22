import React from "react";
import "./index.css";
import { Composition, Folder } from "remotion";
import { VIDEO_CONFIG } from "./config";
import { compositionRegistry } from "./compositions/registry";
import { componentRegistry } from "./components/registry";

// ── Composition registry ──────────────────────────────────────────────────────
// Add new compositions in src/compositions/registry.ts — no changes needed here.
const compositionsByFolder = compositionRegistry.reduce<
  Record<string, typeof compositionRegistry>
>((acc, cfg) => {
  (acc[cfg.folder] ??= []).push(cfg);
  return acc;
}, {});

// ── Component registry ────────────────────────────────────────────────────────
// Add new components in src/components/registry.ts — no changes needed here.
const componentsByFolder = componentRegistry.reduce<
  Record<string, typeof componentRegistry>
>((acc, cfg) => {
  (acc[cfg.folder] ??= []).push(cfg);
  return acc;
}, {});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ─── Compositions (auto-registered from registry.ts) ─────────────── */}
      <Folder name="Compositions">
        {Object.entries(compositionsByFolder).map(([folder, cfgs]) => (
          <Folder key={folder} name={folder}>
            {cfgs.map((cfg) => (
              <React.Fragment key={cfg.id}>
                {/* Scenes sub-folder */}
                {cfg.scenes && cfg.scenes.length > 0 && (
                  <Folder name="Scenes">
                    {cfg.scenes.map((scene) => (
                      <Composition
                        key={scene.id}
                        id={scene.id}
                        component={scene.component as React.ComponentType<Record<string, unknown>>}
                        schema={scene.schema ?? cfg.schema}
                        defaultProps={scene.defaultProps ?? cfg.defaultProps}
                        durationInFrames={scene.durationInFrames}
                        fps={cfg.fps}
                        width={cfg.width}
                        height={cfg.height}
                      />
                    ))}
                  </Folder>
                )}
                {/* Full composition */}
                <Composition
                  id={cfg.id}
                  component={cfg.component as React.ComponentType<Record<string, unknown>>}
                  schema={cfg.schema}
                  defaultProps={cfg.defaultProps}
                  durationInFrames={cfg.durationInFrames}
                  fps={cfg.fps}
                  width={cfg.width}
                  height={cfg.height}
                />
              </React.Fragment>
            ))}
          </Folder>
        ))}
      </Folder>

      {/* ─── Reusable Components (auto-registered from registry.ts) ────────── */}
      <Folder name="Components">
        {Object.entries(componentsByFolder).map(([folder, cfgs]) => (
          <Folder key={folder} name={folder}>
            {cfgs.map((cfg) => (
              <Composition
                key={cfg.id}
                id={cfg.id}
                component={cfg.component as React.ComponentType<Record<string, unknown>>}
                schema={cfg.schema}
                defaultProps={cfg.defaultProps}
                durationInFrames={cfg.durationInFrames ?? VIDEO_CONFIG.durationShort}
                fps={VIDEO_CONFIG.fps}
                width={VIDEO_CONFIG.width}
                height={VIDEO_CONFIG.height}
              />
            ))}
          </Folder>
        ))}
      </Folder>
    </>
  );
};
