"use client";

import { useState } from "react";
import { OrganViewer } from "../../components/OrganViewer";
import type { Organ } from "../../lib/anatomy-data";

type Props = {
  organ: Organ;
};

export function OrganDetailViewer({ organ }: Props) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [compare, setCompare] = useState(false);

  return (
    <OrganViewer
      organ={organ}
      autoRotate={autoRotate}
      onAutoRotate={setAutoRotate}
      compare={compare}
      onCompare={() => setCompare((enabled) => !enabled)}
    />
  );
}
