import Link from "next/link";
import type { Model } from "@/lib/models";

export default function ModelCard({ model }: { model: Model }) {
  return (
    <Link href={`/${model.slug}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer">
        <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-400">{model.height}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{model.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{model.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">CHF {model.pricePerDay}/jour</span>
          <span className="text-sm text-gray-500">{model.capacity}</span>
        </div>
      </div>
    </Link>
  );
}
