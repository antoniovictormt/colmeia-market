import { FlatCompat } from "@eslint/eslintrc"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname
})

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        plugins: { "simple-import-sort": simpleImportSort },
        rules: {
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    vars: "all",
                    args: "after-used",
                    ignoreRestSiblings: true,
                    varsIgnorePattern: "^_"
                }
            ],
            "no-console": "error",
            semi: ["error", "never"],
            quotes: ["error", "double"],
            "padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: "import", next: "*" },
                { blankLine: "always", prev: "export", next: "*" },
                { blankLine: "always", prev: "const", next: "export" },
                { blankLine: "any", prev: "import", next: "import" }
            ]
        }
    }
]

export default eslintConfig
