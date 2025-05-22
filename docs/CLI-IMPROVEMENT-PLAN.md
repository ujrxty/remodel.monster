# Offermage Core Generator: Improvement Plan

**Audience:** Senior Developer Team
**Date:** October 26, 2023
**Context:** This plan addresses identified areas for improvement within the existing "Offermage" CLI and code generation logic, primarily focusing on EJS templating practices and AI response handling.

## 1. EJS Templating Refinement: ` <%= ` vs. ` <%- ` and Contextual Escaping

**Current Issue:**
The current system relies on the default EJS tag ` <%= ... %> ` which HTML-escapes output, followed by a `cleanHtmlEntities` function to reverse this escaping for JavaScript/JSX/CSS files. This is an indirect and potentially error-prone approach.

**Proposed Solution:**
Adopt a more direct and context-aware templating strategy:

*   **Primary EJS Tag for Code Generation:** Use the unescaped output tag ` <%- ... %> ` as the default for injecting data into JavaScript, JSX, CSS, and other non-HTML code files. This avoids the need for `cleanHtmlEntities`.
*   **Contextual Escaping within Templates:** Implement escaping *only when necessary* and appropriate for the target context.
    *   **JavaScript String Literals:** When injecting data from `config.js` into a JavaScript string within an EJS template, use `JSON.stringify()` to ensure proper escaping of quotes, backslashes, newlines, etc.
        ```ejs
        // Before (conceptual, assuming cleanHtmlEntities was handling it)
        // const title = "<%= config.title %>"; // EJS HTML-escapes, then cleanHtmlEntities reverses

        // After (direct and correct)
        const title = <%- JSON.stringify(config.title || "") %>;
        const someUrl = <%- JSON.stringify(config.imageUrl || "/default.png") %>;
        ```
    *   **JSX Text Content:** React automatically escapes text content to prevent XSS. Therefore, for injecting plain text into JSX, ` <%- config.plainText %> ` is generally safe and correct.
        ```ejs
        // After
        <h1><%- config.hero.title || "Default Title" %></h1>
        <p><%- config.hero.subtitle || "Default Subtitle" %></p>
        ```
    *   **JSX Attributes (String values):** Use `JSON.stringify()` if the attribute value comes from dynamic data and needs to be a properly quoted string. For boolean attributes or direct injection of known safe values, direct use might be okay, but stringifying is safer for dynamic content.
        ```ejs
        // After
        <img src={<%- JSON.stringify(config.logoUrl) %>} alt="Logo" />
        <MyComponent dataProp={<%- JSON.stringify(config.dataObject) %>} />
        ```
    *   **Injecting Raw HTML (Trusted Content):** If there's a legitimate (and rare) case to inject raw HTML from the config into a JSX structure (e.g., a rich text field you *absolutely trust*), use `dangerouslySetInnerHTML` with the value from ` <%- config.trustedHtml %> `. This should be extremely rare.
    *   **CSS Values:** For injecting values into CSS (e.g., background URLs, colors), ` <%- ... %> ` is generally fine, ensuring the values themselves are valid CSS. String values in CSS should be quoted if they contain spaces or special characters, which `JSON.stringify()` can also help with if constructing complex CSS values dynamically.

*   **Deprecate and Remove `cleanHtmlEntities`:** This function will no longer be necessary and should be removed from `templateHelpers.js` and all call sites in `generator.js`.
*   **Review and Update All `.ejs` Templates:** Each template in `templates/` must be meticulously reviewed and updated to use ` <%- ... %> ` and apply `JSON.stringify()` or other contextual escaping as needed. This is the most labor-intensive part.
*   **Update `templateHelpers.js`:**
    *   Remove `escapeJSXEntities` and `escapeJSXAttributes` if their original purpose is now covered by the direct ` <%- ... %> ` and `JSON.stringify()` approach. If they serve a different, still valid escaping purpose (e.g., sanitizing for a specific non-standard context), their role needs to be clearly documented. For typical JS/JSX generation, they are likely redundant with the new approach.

**Benefits:**
*   **Increased Clarity:** Templates will more directly reflect the generated code.
*   **Reduced Complexity:** Eliminates the "escape-then-unescape" dance.
*   **Improved Robustness:** Less prone to errors from incorrect un-escaping.
*   **Better Performance (Minor):** Skips an unnecessary processing step.

## 2. Robust AI JSON Response Parsing

**Current Issue:**
The `aiGenerator.js` uses a regex (`response.match(/\{[\s\S]*\}/)`) to extract the JSON block from the AI's response. This can be fragile if the LLM includes introductory/concluding text or if the text contains other brace patterns.

**Proposed Solutions (Choose one or combine):**

*   **A. Enhanced Prompt Engineering:**
    *   Instruct the LLM even more strictly: "Your response MUST be ONLY a valid JSON object, starting with `{` and ending with `}`. Do not include any explanatory text, markdown formatting, or any characters before the opening brace or after the closing brace."
    *   Request the LLM to use a specific marker if it cannot fulfill the JSON request (e.g., "If you cannot generate valid JSON, respond with `ERROR: reason`").
*   **B. OpenAI JSON Mode (If available and applicable for the model used):**
    *   Investigate and utilize the "JSON mode" if supported by `gpt-4` or the specific model version being used with the `openai` library. This forces the model to output syntactically correct JSON.
    *   Example (conceptual, check library docs):
        ```javascript
        // const response = await openai.chat.completions.create({
        //   model: "gpt-4", // Or a model version that explicitly supports JSON mode
        //   response_format: { type: "json_object" },
        //   messages: [/* ... */],
        // });
        // const parsedContent = JSON.parse(response.choices[0].message.content);
        ```
*   **C. More Resilient Parsing Logic:**
    *   If JSON mode isn't feasible or fully reliable, improve the parsing logic:
        1.  Attempt `JSON.parse(response.choices[0].message.content)` directly.
        2.  If it fails, then attempt the regex extraction.
        3.  If regex extraction also fails or results in invalid JSON, log the full problematic response for debugging and fall back to placeholder content more gracefully.
    *   Consider libraries designed for "dirty" JSON fixing if the AI consistently outputs *almost* valid JSON with minor issues (though this adds a dependency and complexity).

**Benefits:**
*   **Increased Reliability:** More robust against variations in LLM output.
*   **Easier Debugging:** Better logging when parsing fails.

## 3. Schema Validation and Type Safety for Config

**Current Issue:**
While `validateOfferConfig` exists, its integration with AI-generated content needs to be tight. The types within `config.js` are implicit.

**Proposed Solution:**

*   **JSDoc for `config.js` Structure:** Even without TypeScript, meticulously use JSDoc to define the expected structure and types of the `config` object and its nested properties. This will provide better IntelliSense in editors and serve as documentation.
    ```javascript
    // Example in a generated config/{id}.js or a central types definition file
    /**
     * @typedef {object} HeroSectionConfig
     * @property {string} title
     * @property {string} [subtitle] - Optional subtitle
     * @property {string} cta
     * @property {string} valueProposition
     * @property {{desktop?: string, mobile?: string}} [backgroundImage]
     */

    /**
     * @typedef {object} OfferConfig
     * @property {string} id
     * @property {string} name
     * // ... other properties
     * @property {{hero: HeroSectionConfig, benefits: BenefitsSectionConfig, ...}} sections
     */

    /** @type {OfferConfig} */
    module.exports = { /* ... config data ... */ };
    ```
*   **Robust Validation Post-AI:** Ensure `validateOfferConfig` (and potentially more granular validators for subsections) is run *after* AI content is merged. The validator should check not only presence but also types (e.g., `typeof property === 'string'`) where feasible.
*   **Graceful Fallbacks for Type Mismatches:** If AI provides, for instance, an array where a string is expected by an EJS template, the validator should catch this, or the EJS template should have robust fallbacks (e.g., `(config.value || "").toString()`).

**Benefits:**
*   **Early Error Detection:** Catch structural or type issues in config data before they cause EJS rendering failures.
*   **Improved Developer Experience:** Better IntelliSense and understanding of the config structure.

## Action Plan & Timeline:

1.  **Phase 1 (Critical - 1-2 Sprints):**
    *   Implement EJS templating refinement (`<%-` and contextual `JSON.stringify()`).
    *   Update all `.ejs` templates.
    *   Remove `cleanHtmlEntities`.
    *   Test generated output thoroughly.
2.  **Phase 2 (High Priority - 1 Sprint):**
    *   Implement robust AI JSON response parsing (JSON mode or improved logic).
    *   Add detailed JSDoc for the `OfferConfig` structure.
3.  **Phase 3 (Medium Priority - Ongoing):**
    *   Enhance `validateOfferConfig` for stricter type checks post-AI generation.
    *   Continuously refine JSDoc types as the config evolves.

This plan aims to make the Offermage generator more robust, maintainable, and easier to develop for.
