"use client";
import { Combobox } from "@/components/ui/combobox";
import { useState } from "react";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

function Workouts() {
  const [selectedItem, setSelectedItem] = useState<string>("");

  return (
    <div>
      <Combobox
        list={frameworks}
        defaultValue="Select framework..."
        onItemSelect={setSelectedItem}
        selectedItem={selectedItem}
      />
      <div className="mt-4">
        {selectedItem ? (
          <div>
            <h2 className="text-lg font-semibold">Selected framework</h2>
            <p className="text-gray-600">{selectedItem}</p>
          </div>
        ) : (
          <p className="text-gray-600">No framework selected.</p>
        )}
      </div>
    </div>
  );
}

export default Workouts;
