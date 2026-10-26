import { Model } from "@/lib/constants";

export default function ProductGallery({ model }: { model: Model }) {
  return (
    <div className="gallery">
      {model.images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt={`${model.name} – photo ${i + 1}`} loading={i < 2 ? "eager" : "lazy"} width={800} height={600} />
      ))}
    </div>
  );
}
