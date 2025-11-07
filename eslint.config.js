const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const babelParser = require("@babel/eslint-parser");
const react = require("eslint-plugin-react");
const prettier = require("eslint-plugin-prettier");
const _import = require("eslint-plugin-import");
const reactHooks = require("eslint-plugin-react-hooks");
const promise = require("eslint-plugin-promise");
const jam3 = require("eslint-plugin-jam3");
const unusedImports = require("eslint-plugin-unused-imports");

const {
    fixupPluginRules,
} = require("@eslint/compat");

const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.commonjs,
            ...globals.node,
        },

        ecmaVersion: 2018,
        sourceType: "module",

        parserOptions: {
            requireConfigFile: false,

            ecmaFeatures: {
                jsx: true,
            },

            babelOptions: {
                presets: ["@babel/preset-react"],
            },
        },

        parser: babelParser,
    },

    extends: compat.extends(
        "plugin:json/recommended",
        "eslint:recommended",
        "plugin:react/recommended",
        "./.eslint-rules/globals",
        "./.eslint-rules/imports/order",
        "./.eslint-rules/overrides",
        "./.eslint-rules/custom",
        "./.eslint-rules/imports/enforced",
        "./.eslint-rules/react",
        "./.eslint-rules/promise",
        "prettier",
    ),

    settings: {
        react: {
            version: "detect",
        },

        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx", ".svg", ".json", ".mp3"],
            },
        },
    },

    plugins: {
        react,
        prettier,
        import: fixupPluginRules(_import),
        "react-hooks": fixupPluginRules(reactHooks),
        promise,
        jam3,
        "unused-imports": unusedImports,
    },

    rules: {
        "prettier/prettier": "error",

        "no-unused-vars": ["error", {
            args: "all",
            argsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            caughtErrors: "all",
        }],

        "no-undef": "error",
        "no-console": "error",
        "consistent-return": "error",

        "padding-line-between-statements": ["error", {
            blankLine: "always",
            prev: "if",
            next: ["if", "return"],
        }, {
            blankLine: "always",
            prev: "*",
            next: "return",
        }, {
            blankLine: "always",

            prev: [
                "block",
                "multiline-block-like",
                "function",
                "iife",
                "multiline-const",
                "multiline-expression",
            ],

            next: ["function", "iife", "multiline-const", "multiline-expression"],
        }],

        curly: ["error", "multi-line"],
        "no-else-return": "error",

        "jam3/no-sanitizer-with-danger": [2, {
            wrapperName: ["dompurify", "sanitizer", "sanitize"],
        }],

        "comma-dangle": ["error", {
            arrays: "always-multiline",
            objects: "always-multiline",
            imports: "always-multiline",
            exports: "always-multiline",
            functions: "never",
        }],

        "prefer-const": "error",
        eqeqeq: "error",
        "no-unsafe-optional-chaining": "error",
        "unused-imports/no-unused-imports": "error",
        "no-nested-ternary": "warn",
        "arrow-body-style": ["error", "as-needed"],
        "prefer-template": "error",

        "no-unneeded-ternary": ["error", {
            defaultAssignment: false,
        }],

        "object-shorthand": ["error", "always", {
            avoidQuotes: true,
            ignoreConstructors: true,
        }],

        "prefer-arrow-callback": ["error", {
            allowUnboundThis: true,
        }],

        "no-duplicate-imports": ["error", {
            includeExports: true,
        }],

        "no-implicit-coercion": ["error", {
            allow: ["!!"],
        }],

        "no-var": "error",

        "react/jsx-newline": ["error", {
            prevent: true,
        }],
    },
}, globalIgnores([
    "**/public",
    "**/coverage",
    "**/db",
    "**/docs",
    "**/log",
    "**/.scripts",
    "**/.semaphore",
    "**/test",
    "**/tmp",
    "**/.vscode",
    "app/javascript/packs",
    "**/jsconfig.json",
    "**/esbuild.config.js",
    "**/vite.config.js",
    "config/build/config.js",
])]);
