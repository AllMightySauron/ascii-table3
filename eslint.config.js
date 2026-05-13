module.exports = [
    {
        ignores: [
            "coverage/**",
            "dist/**",
            "node_modules/**"
        ]
    },
    {
        files: [
            "index.js",
            "src/**/*.js",
            "test/**/*.js",
            "samples.js",
            "sample_list_dir.js"
        ],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "commonjs",
            globals: {
                Buffer: "readonly",
                console: "readonly",
                describe: "readonly",
                it: "readonly",
                module: "readonly",
                process: "readonly",
                require: "readonly"
            }
        },
        rules: {
            "no-undef": "error",
            "no-unused-vars": ["error", { args: "none" }],
            "semi": ["error", "always"]
        }
    }
];
