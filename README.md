# React Router + Color Scheme Example

This is a simple example app using React Router and a color scheme toggle.

The app starts using the color scheme of the user's operating system. The user can toggle between light and dark modes using a button, or go back to the system default.

To support this, we use a cookie to store the user's preference, the cookie is typed to have three possible values: `light`, `dark`, and `system`.

If the cookie is not set, or if the value is `system`, we use the `prefers-color-scheme` media query to determine the color scheme. If the value is `light` or `dark`, we use that value instead.

To support this, we override the `dark:` variant on the Tailwind configuration to work with both `.dark` class or `.system` class + media query.

```css
@custom-variant dark {
  /* This supports the .dark class */
  &:where(.dark *, .dark) {
    @slot;
  }

  /* This supports the .system class + media query */
  &:where(.system *, .system) {
    @media (prefers-color-scheme: dark) {
      @slot;
    }
  }
}
```

This approach doesn't use any JavaScript to determine the color scheme, and doesn't have a flash of uncorrect color scheme on page load because we can read the cookie value on the server side and set the initial class on the HTML element.

And since for the `.system` class we use the `prefers-color-scheme` media query in CSS, the browser will automatically render the correct colors when the page loads, instead of needing to inject an inline script in the `<head>` to read the `window.matchMedia` value and set the class on the HTML element.

## Files to check

- [app/app.css](./app/app.css)
- [app/color-scheme-cookie.ts](./app/color-scheme-cookie.ts)
- [app/root.tsx](./app/root.tsx)
- [app/routes/home.tsx](./app/routes/home.tsx)
