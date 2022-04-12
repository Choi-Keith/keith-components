const { readdirSync } = require('fs');
const { join } = require('path');

const pkgList = readdirSync(join(__dirname, './packages')).filter((pkg) => pkg.charAt(0) !== '.');

const moduleNameMapper = {
  '\\.(css|less|sass|scss)$': require.resolve('identity-obj-proxy'),
};

pkgList.forEach((shortName) => {
  const name = `@keith/${shortName}`; // 修改为自己的包名
  moduleNameMapper[name] = join(__dirname, `./packages/${shortName}/src`);
});

module.exports = {
  // 配置从哪些目录的覆盖率
  collectCoverageFrom: [
    'packages/**/src/**/*.{ts,tsx}',
    '!packages/**/src/demos/**',
    '!packages/**/src/**/demos/**',
    '!packages/utils/src/isDeepEqualReact/*.{ts,tsx}',
  ],
  moduleNameMapper,
  unmockedModulePathPatterns: ['node_modules/react/', 'node_modules/enzyme/'],
  testURL:
    'http://localhost?navTheme=realDark&layout=mix&primaryColor=daybreak&splitMenus=false&fixedHeader=true',
  verbose: true, // 是否在运行期间报告每个单独组件的测试情况
  snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
  setupFiles: ['./tests/setupTests.js'], // 设置测试环境的模块路径
};
