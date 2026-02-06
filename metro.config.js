// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add support for .obj and .glb files
config.resolver.assetExts.push('obj', 'glb', 'mtl');

module.exports = config;

