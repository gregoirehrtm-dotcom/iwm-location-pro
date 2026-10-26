import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AccessCheck from "@/components/AccessCheck";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import MobileBar from "@/components/MobileBar";
import { Spec } from "@/components/ModelCard";
import { cardDrawing } from "@/lib/drawing";
import { chf, meters } from "@/lib/format";
import { models, platformHeight } from "@/lib/models";
import { site } from "@/lib/site";

type Props = { params: Promise<{ model: string }> };

export async function generateStaticParams() {
  return models.map((m) => ({ model: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { model: slug } = await params;
  const model = models.find((m) => m.slug === slug);
  if (!model) return {};
  return {
    title: `${model.name}, nacelle ciseaux électrique | IWM Location`,
    description: `${model.description} Hauteur de travail ${meters(model.workingHeight)}. Dès ${chf(model.pricePerDay)} par jour.`,
  };
}

export default async function ModelPage({ params }: Props) {
  const { model: slug } = await params;
  const model = models.find((m) => m.slug === slug);

  if (!model) notFound();

  const quoteHref = `/?modele=${model.slug}#devis`;

  return (
    <>
      <a className="skip" href="#contenu">Aller au contenu</a>
      <Header onHome={false} />
      <main id="contenu">
        <section className="section" style={{ borderTop: 0 }} aria-labelledby="t-model">
          <div className="wrap">
            <nav className="crumbs" aria-label="Fil d’Ariane">
              <Link href="/">Accueil</Link>
              <span aria-hidden="true">/</span>
              <Link href="/#nacelles">Nacelles</Link>
              <span aria-hidden="true">/</span>
              <span>{model.name}</span>
            </nav>
            <div className="model-grid">
              <figure className="sheet model-fig">
                <svg className="draw lf" viewBox="0 0 220 300" aria-hidden="true" dangerouslySetInnerHTML={{ __html: cardDrawing(model) }} />
                <div className="cartouche" aria-hidden="true">
                  <span>{model.name}</span>
                  <span>2026</span>
                </div>
              </figure>
              <div className="model-info">
                <p className="label">Nacelle ciseaux électrique</p>
                <h1 id="t-model">
                  <small>IWM</small>
                  {model.short}
                </h1>
                <p className="lead">{model.description}</p>
                <p className="from">
                  Dès <strong>{chf(model.pricePerDay)}</strong> par jour, remise de 10&nbsp;% dès 8 jours et de 20&nbsp;% dès 29 jours.
                </p>
                <dl className="specs">
                  <Spec label="Hauteur de travail" value={model.workingHeight} unit="m" />
                  <Spec label="Hauteur de plancher" value={platformHeight(model)} unit="m" />
                  <Spec label="Capacité" value={model.capacity} unit="kg" />
                  <Spec label="Largeur" value={model.width} unit="m" />
                  <Spec label="Longueur repliée" value={model.length} unit="m" />
                  <Spec label="Hauteur repliée" value={model.stowedHeight} unit="m" />
                  <div>
                    <dt>Énergie</dt>
                    <dd>Électrique, batterie</dd>
                  </div>
                </dl>
                <div className="cta">
                  <Link className="btn btn-primary" href={quoteHref}>
                    Demander un devis
                  </Link>
                  <a className="btn btn-line num" href={site.phoneHref}>
                    <Icon name="phone" />
                    {site.phone}
                  </a>
                </div>
                <AccessCheck model={model} />
                <div className="others">
                  <span className="label" style={{ alignSelf: "center" }}>Autres nacelles</span>
                  {models
                    .filter((m) => m.slug !== model.slug)
                    .map((m) => (
                      <Link key={m.slug} className="chip" href={`/${m.slug}`}>
                        {m.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBar quoteHref={quoteHref} />
    </>
  );
}
