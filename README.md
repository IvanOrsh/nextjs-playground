## nextjs playground

- using pocketbase as backend
- using nextjs for frontend

### routing

`about/` - example.com/about
`[slug]/` - example.com/{slug}
`(group)/` - example.com/??? - value inside brackets gonna be ignored by routing system (when we don't want to affect the actual route structure)

---

**Special files**:

- `page.tsx` - the unique ui of a route
- `layout.tsx` - across multiple pages (we can even fetch data in layouts)
- `loading.tsx` - an opt. file used to create loading UI for a specific part of an app (automatically wraps a page or child layout in a **React Suspense Boundary**)
- `error.tsx` - it automatically wraps a page or child in a **React Error Boundary**
- `head.tsx` - `<head>` tag for a given route
