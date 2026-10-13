<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Use TanStack file routes for portfolio pages and a shared navigation/footer shell; this preserves direct links and page-specific metadata.
- Keep portfolio facts and original source links in a shared browser-safe content module; this avoids conflicting project information across pages.
- Express visual styling with semantic tokens and reusable classes in src/styles.css; this keeps the portfolio's visual identity consistent.
- Use a dedicated Vercel build with the Nitro Vercel adapter and public-media preparation; this preserves Lovable previews while keeping third-party hosting independent of the Lovable media proxy.
- Keep dashboard-page entries in a shared report collection rendered by the reusable gallery; this lets additional report pages appear consistently in project previews and case studies.
