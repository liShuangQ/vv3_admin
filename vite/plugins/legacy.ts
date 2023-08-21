import legacy from '@vitejs/plugin-legacy';
export function setupLegacyPlugin() {
    return legacy({
        targets: ['chrome < 60', 'edge < 15'],
        renderLegacyChunks: true,
    });
  }

