import { site } from '../../config/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return <footer className="footer" data-pagefind-ignore><div className="sx-container footer__inner"><span className="footer__brand">{site.name}</span><span className="footer__tag">{site.tagline}</span><nav className="footer__social" aria-label="Social">{site.social.map((social) => <a className="footer__link" href={social.href} rel="me noopener" target="_blank" key={social.href}>{social.label}</a>)}</nav><span className="footer__copy">© {year} {site.author.name}</span></div></footer>;
}
