"use client";
import { useState } from "react";
import { models } from "@/lib/models";

export default function PriceEstimator() {
  const [selectedModel, setSelectedModel] = useState("6m");
  const [days, setDays] = useState(1);

  const model = models.find((m) => m.slug === selectedModel);
  const dailyPrice = model?.pricePerDay || 0;
  const subtotal = dailyPrice * days;
  const discount = days >= 29 ? Math.floor(subtotal * 0.2) : days >= 8 ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  return (
    <div className="bg-gray-50 p-8 rounded-lg">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="estimator-model" className="block font-bold mb-2">Modèle</label>
          <select 
            id="estimator-model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full border rounded p-2"
          >
            {models.map((m) => (
              <option key={m.slug} value={m.slug}>{m.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="estimator-days" className="block font-bold mb-2">Nombre de jours</label>
          <input 
            id="estimator-days"
            type="number" 
            min="1" 
            value={days}
            onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded">
        <div className="flex justify-between mb-2">
          <span>Sous-total:</span>
          <span>CHF {subtotal}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between mb-2 text-success">
            <span>Remise ({days >= 29 ? "20%" : "10%"}):</span>
            <span>-CHF {discount}</span>
          </div>
        )}
        <div className="border-t pt-2 flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span className="text-primary">CHF {total}</span>
        </div>
      </div>
    </div>
  );
}
