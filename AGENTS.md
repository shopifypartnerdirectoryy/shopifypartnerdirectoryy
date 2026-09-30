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

- Keep directory service groups in `src/lib/directory-navigation.ts` and route menu selections through homepage filters; this keeps browsing categories and results aligned.
- Generate public sitemap entries from route decisions and the local expert list without synthetic lastmod dates; this prevents stale or misleading crawl hints.
