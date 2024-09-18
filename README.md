# 📊 Ultra-Reporter

This is a simple TestNG reporter

## 📷 Sample Report

![Ultra-report](/assets/ultra-report.png)

## 🚀 Getting Started

- Install Ultra-reporter by running `npm i -g ultra-report`
- Run your tests using the default TestNG listeners
- Once the tests are executed, copy the generated Test result XML file path from the `test-output/[suite-name]/[test-name].xml` path
- Run the command `ultra-report [xml-file-path.xml]`

### ⬇️ Command output

```shell
> ultra-report "/Users/user-name/Downloads/ECommerce API Testing.xml"
✔ XML File exists
✔ Parsed XML data written to "/Users/user-name/Documents/github/public/results"
✔ Report generated successfully!
✔ Report opened in the default browser.
ℹ You can find the report at "/Users/user-name/Documents/github/out/index.html"

ℹ Read the docs at 🔗 https://github.com/WasiqB/ultra-report

Total time taken: 15.777s
```

## 🦾 Tech Stack

- [Next JS 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Daisy UI](https://daisyui.com/)
