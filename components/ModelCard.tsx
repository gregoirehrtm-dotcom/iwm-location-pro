import Link from "next/link";
import type { Model } from "@/lib/models";

export default function ModelCard({ model }: { model: Model }) {
  return (
    <Link href={`/${model.slug}`} className="block rounded border p-4 hover:shadow">
      <h2 className="text-xl font-semibold">{model.name}</h2>
      <p className="text-sm text-gray-600">Hauteur : {model.height}</p>
    </Link>
  );
}
